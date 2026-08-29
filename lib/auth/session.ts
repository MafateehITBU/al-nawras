import { UnauthorizedError } from "@/lib/api/errors";
import {
  ADMIN_PUBLIC_SELECT,
  toAdminPublic,
  type SessionAdmin,
} from "@/lib/authorization/permissions";
import prisma from "@/lib/db/prisma";

export async function validateSessionAdmin(
  sessionAdmin: SessionAdmin,
): Promise<SessionAdmin> {
  const admin = await prisma.admin.findUnique({
    where: { id: sessionAdmin.id },
    select: ADMIN_PUBLIC_SELECT,
  });

  if (!admin || !admin.isActive) {
    throw new UnauthorizedError("Account is inactive or no longer exists");
  }

  return toAdminPublic(admin);
}
