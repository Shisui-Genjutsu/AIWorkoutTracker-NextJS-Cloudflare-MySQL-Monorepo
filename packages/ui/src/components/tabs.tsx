"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: "solid" | "underlined" | "bordered" | "light";
  indicatorId: string;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: "solid" | "underlined" | "bordered" | "light";
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, variant = "solid", children, ...props }, ref) => {
    const [activeTab, setActiveTabState] = React.useState(value ?? defaultValue);
    const indicatorId = React.useId();

    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setActiveTabState(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange]
    );

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        activeTab: value ?? activeTab,
        setActiveTab,
        variant,
        indicatorId,
      }),
      [activeTab, value, setActiveTab, variant, indicatorId]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);

    if (!context) {
      throw new Error("TabsList must be used within Tabs");
    }

    const variant = context.variant;

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center",
          variant === "solid" && "gap-1 rounded-full bg-muted/50 p-1",
          variant === "underlined" && "gap-4 border-b border-border",
          variant === "bordered" && "gap-1 rounded-lg border border-border p-1",
          variant === "light" && "gap-2 bg-muted/30 p-1 rounded-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);

    if (!context) {
      throw new Error("TabsTrigger must be used within Tabs");
    }

    const isActive = context.activeTab === value;
    const variant = context.variant;

    const getIndicatorClasses = () => {
      switch (variant) {
        case "underlined":
          return "absolute bottom-0 left-0 right-0 h-0.5 bg-primary";
        case "bordered":
          return "absolute inset-0 rounded-md bg-primary/90 shadow-sm";
        case "light":
          return "absolute inset-0 rounded-md bg-primary/10";
        default:
          return "absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-sm";
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-tab-value={value}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "solid" && [
            "rounded-full px-4 py-2",
            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          ],
          variant === "underlined" && [
            "pb-2 px-1",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          ],
          variant === "bordered" && [
            "rounded-md px-4 py-2",
            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          ],
          variant === "light" && [
            "rounded-md px-3 py-1.5",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          ],
          className
        )}
        onClick={() => context.setActiveTab(value)}
        {...props}
      >
        {isActive && (
          <motion.div
            layoutId={context.indicatorId}
            transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
            className={cn("-z-10", getIndicatorClasses())}
            aria-hidden="true"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragEnd" | "onDragStart"> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);

    if (!context) {
      throw new Error("TabsContent must be used within Tabs");
    }

    const isActive = context.activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";
