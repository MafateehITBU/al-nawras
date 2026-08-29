"use client";

import { hasPermission } from "@/lib/authorization/permissions";
import type { SessionAdmin } from "@/lib/authorization/permissions";
import {
  dashboardNavGroups,
  filterNavForAdmin,
  type DashboardNavItem,
} from "@/constants/dashboard-nav";
import { cn } from "@/lib/utils";
import { GuardedLink } from "@/components/dashboard/guarded-link";
import { Permission } from "@prisma/client";

export function useDashboardPermissions(admin: SessionAdmin | null) {
  const canAccess = (permission?: Permission) => {
    if (!admin) return false;
    if (!permission) return true;
    return hasPermission(admin, permission);
  };

  const navGroups = admin
    ? filterNavForAdmin(dashboardNavGroups, canAccess)
    : [];

  return { admin, canAccess, navGroups };
}

export function SidebarNav({
  items,
  pathname,
  collapsed,
}: {
  items: DashboardNavItem[];
  pathname: string;
  collapsed: boolean;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        const Icon = item.icon;

        return (
          <li key={item.href}>
            <GuardedLink
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-ring",
                isActive
                  ? "bg-dashboard-primary/10 text-dashboard-primary"
                  : "text-dashboard-text-muted hover:bg-dashboard-bg hover:text-dashboard-text",
                collapsed && "justify-center px-2",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              {!collapsed && <span>{item.label}</span>}
            </GuardedLink>
          </li>
        );
      })}
    </ul>
  );
}
