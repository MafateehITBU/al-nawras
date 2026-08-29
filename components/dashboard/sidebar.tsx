"use client";

import { Logo } from "@/components/dashboard/logo";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { DashboardNavGroup } from "@/constants/dashboard-nav";

export function Sidebar({
  pathname,
  navGroups,
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
  logoUrl,
}: {
  pathname: string;
  navGroups: DashboardNavGroup[];
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
  logoUrl?: string | null;
}) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar overlay"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-dashboard-border bg-dashboard-surface transition-all duration-200 lg:static lg:z-auto",
          collapsed
            ? "w-[var(--dashboard-sidebar-collapsed-width)]"
            : "w-[var(--dashboard-sidebar-width)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex h-[var(--dashboard-header-height)] items-center gap-2 border-b border-dashboard-border",
            collapsed ? "justify-center px-2" : "px-3",
          )}
        >
          <Logo collapsed={collapsed} logoUrl={logoUrl} className="min-w-0 flex-1" />
          <button
            type="button"
            className="rounded-md p-1.5 text-dashboard-text-muted hover:bg-dashboard-bg focus-ring lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main">
          <div className="space-y-6">
            {navGroups.map((group, index) => (
              <div key={group.label ?? `group-${index}`}>
                {group.label && !collapsed && (
                  <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-dashboard-text-muted">
                    {group.label}
                  </p>
                )}
                <SidebarNav
                  items={group.items}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              </div>
            ))}
          </div>
        </nav>

        <div className="hidden border-t border-dashboard-border p-3 lg:block">
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="flex w-full items-center justify-center rounded-lg py-2 text-dashboard-text-muted hover:bg-dashboard-bg focus-ring"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-5" />
            ) : (
              <ChevronLeft className="size-5" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
