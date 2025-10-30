"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = React.useCallback(() => setCollapsed((v) => !v), []);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

export function Sidebar({ children, className, title = "AI Workout" }: { children: React.ReactNode; className?: string; title?: string }) {
  const { collapsed, toggle } = useSidebar();
  return (
    <aside
      className={cn(
        "relative shrink-0 border-r bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex h-14 items-center px-2 border-b justify-between">
        <span className={cn("text-sm font-semibold", collapsed && "opacity-0 pointer-events-none")}>{title}</span>
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={toggle}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
        >
          {/* simple chevron icon */}
          <svg
            className={cn("h-4 w-4 transition-transform", collapsed ? "rotate-180" : "rotate-0")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      <div className="p-2" data-collapsed={collapsed ? "true" : "false"}>{children}</div>

      {/* Rail toggle when collapsed */}
      {collapsed ? (
        <button
          type="button"
          onClick={toggle}
          aria-label="Expand sidebar"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
        >
          <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      ) : null}
    </aside>
  );
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <nav className={cn("space-y-1", className)}>{children}</nav>;
}

export function SidebarItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-2", className)}>{children}</div>;
}

export function SidebarLink(
  { asChild, className, icon, label, ...props }:
    (React.ComponentProps<"a"> & { asChild?: boolean; icon?: React.ReactNode; label?: React.ReactNode })
) {
  const Comp = asChild ? Slot : "a";
  const { collapsed } = useSidebar();
  return (
    <Comp
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-2 text-sm",
        "hover:bg-muted hover:text-foreground",
        "aria-[current=page]:bg-muted aria-[current=page]:text-foreground",
        "relative",
        collapsed && "justify-center px-2",
        className,
      )}
      {...props}
    >
      {icon ? <span className="h-4 w-4 shrink-0">{icon}</span> : null}
      <span className={cn("truncate", collapsed && "hidden")}>{label ?? props.children}</span>
      {/* active indicator bar */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded bg-primary opacity-0 group-aria-[current=page]:opacity-100" />
    </Comp>
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-2 space-y-1", className)}>{children}</div>;
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("px-3 py-2 text-xs font-medium text-muted-foreground", collapsed && "hidden", className)}>
      {children}
    </div>
  );
}

export function SidebarGroupContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}


