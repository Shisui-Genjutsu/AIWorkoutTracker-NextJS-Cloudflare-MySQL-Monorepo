"use client";

import { Transition, motion } from "motion/react";
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
  useRef,
  useLayoutEffect,
} from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string }>[]
    | ReactElement<{ "data-id": string }>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);

    if (onValueChange) {
      onValueChange(id);
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  // Update indicator position when active tab changes
  useLayoutEffect(() => {
    if (!activeId || !containerRef.current) {
      setIndicatorStyle(null);
      return;
    }

    const updateIndicator = () => {
      const container = containerRef.current;
      if (!container) return;

      const activeButton = container.querySelector(
        `[data-id="${activeId}"]`
      ) as HTMLButtonElement;

      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        setIndicatorStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
          height: buttonRect.height,
        });
      }
    };

    // Small delay to ensure DOM is updated
    requestAnimationFrame(() => {
      updateIndicator();
    });

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const activeButton = containerRef.current?.querySelector(
      `[data-id="${activeId}"]`
    );
    if (activeButton) {
      resizeObserver.observe(activeButton);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeId]);

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {indicatorStyle && (
        <motion.div
          layoutId={`background-${uniqueId}`}
          className={cn("absolute z-0", className)}
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: indicatorStyle.height,
          }}
          transition={
            transition || {
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.8,
            }
          }
        />
      )}
      {Children.map(children, (child: any, index) => {
        const id = child.props["data-id"];

        const interactionProps = enableHover
          ? {
              onMouseEnter: () => handleSetActiveId(id),
              onMouseLeave: () => handleSetActiveId(null),
            }
          : {
              onClick: () => handleSetActiveId(id),
            };

        return cloneElement(
          child,
          {
            key: id || index,
            className: cn("relative z-10 inline-flex", child.props.className),
            "aria-selected": activeId === id,
            "data-checked": activeId === id ? "true" : "false",
            "data-id": id,
            ...interactionProps,
          },
          child.props.children
        );
      })}
    </div>
  );
}
