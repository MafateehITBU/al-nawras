import { AdminRole, Permission } from "@prisma/client";
import type { AdminPublic } from "@/types";

export const ADMIN_PUBLIC_SELECT = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  profileImageUrl: true,
  profileImagePublicId: true,
  role: true,
  permissions: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type AdminPublicRecord = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  profileImagePublicId: string | null;
  role: AdminRole;
  permissions: Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function toAdminPublic(admin: AdminPublicRecord): AdminPublic {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
    profileImageUrl: admin.profileImageUrl,
    profileImagePublicId: admin.profileImagePublicId,
    role: admin.role,
    permissions: admin.permissions,
    isActive: admin.isActive,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

export type SessionAdmin = AdminPublic;

export function isSuperAdmin(admin: Pick<AdminPublic, "role">): boolean {
  return admin.role === AdminRole.SUPER_ADMIN;
}

export function hasPermission(
  admin: Pick<AdminPublic, "role" | "permissions">,
  permission: Permission,
): boolean {
  if (isSuperAdmin(admin)) {
    return true;
  }

  return admin.permissions.includes(permission);
}

export function hasAnyPermission(
  admin: Pick<AdminPublic, "role" | "permissions">,
  permissions: Permission[],
): boolean {
  if (isSuperAdmin(admin)) {
    return true;
  }

  return permissions.some((permission) => admin.permissions.includes(permission));
}

export function hasAllPermissions(
  admin: Pick<AdminPublic, "role" | "permissions">,
  permissions: Permission[],
): boolean {
  if (isSuperAdmin(admin)) {
    return true;
  }

  return permissions.every((permission) => admin.permissions.includes(permission));
}
