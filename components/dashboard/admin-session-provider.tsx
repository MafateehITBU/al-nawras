"use client";

import { hasPermission } from "@/lib/authorization/permissions";
import type { SessionAdmin } from "@/lib/authorization/permissions";
import { Permission } from "@prisma/client";
import { createContext, useContext, type ReactNode } from "react";

const AdminSessionContext = createContext<SessionAdmin | null>(null);

export function AdminSessionProvider({
  admin,
  children,
}: {
  admin: SessionAdmin;
  children: ReactNode;
}) {
  return (
    <AdminSessionContext.Provider value={admin}>
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession(): SessionAdmin {
  const admin = useContext(AdminSessionContext);
  if (!admin) {
    throw new Error("useAdminSession must be used within AdminSessionProvider");
  }
  return admin;
}

export function useCan(permission: Permission): boolean {
  const admin = useAdminSession();
  return hasPermission(admin, permission);
}

export function Can({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const allowed = useCan(permission);
  return allowed ? children : fallback;
}
