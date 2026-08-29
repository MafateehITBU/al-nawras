import { UnauthorizedError, ForbiddenError } from "@/lib/api/errors";
import { auth } from "@/lib/auth/config";
import { validateSessionAdmin } from "@/lib/auth/session";
import {
  hasPermission,
  isSuperAdmin,
  type SessionAdmin,
} from "@/lib/authorization/permissions";
import type { Permission } from "@prisma/client";

export async function getSessionAdmin(): Promise<SessionAdmin | null> {
  const session = await auth();
  return session?.admin ?? null;
}

export async function requireAuth(): Promise<SessionAdmin> {
  const admin = await getSessionAdmin();

  if (!admin) {
    throw new UnauthorizedError();
  }

  return validateSessionAdmin(admin);
}

export async function requirePermission(
  permission: Permission,
): Promise<SessionAdmin> {
  const admin = await requireAuth();

  if (!hasPermission(admin, permission)) {
    throw new ForbiddenError("You do not have permission to perform this action");
  }

  return admin;
}

export async function requireSuperAdmin(): Promise<SessionAdmin> {
  const admin = await requireAuth();

  if (!isSuperAdmin(admin)) {
    throw new ForbiddenError("Super admin access required");
  }

  return admin;
}
