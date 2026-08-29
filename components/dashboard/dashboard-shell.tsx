"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AdminSessionProvider } from "@/components/dashboard/admin-session-provider";
import { useDashboardPermissions } from "@/components/dashboard/sidebar-nav";
import type { SessionAdmin } from "@/lib/authorization/permissions";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function DashboardShell({
  admin,
  children,
  logoUrl,
}: {
  admin: SessionAdmin;
  children: React.ReactNode;
  logoUrl?: string | null;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navGroups } = useDashboardPermissions(admin);

  return (
    <AdminSessionProvider admin={admin}>
      <div className="flex min-h-screen bg-dashboard-bg">
        <Sidebar
          pathname={pathname}
          navGroups={navGroups}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
          onCloseMobile={() => setMobileOpen(false)}
          logoUrl={logoUrl}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader onOpenMobileMenu={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </AdminSessionProvider>
  );
}
