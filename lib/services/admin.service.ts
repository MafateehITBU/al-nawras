import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "@/lib/api/errors";
import { hashPassword } from "@/lib/auth/password";
import {
  ADMIN_PUBLIC_SELECT,
  isSuperAdmin,
  toAdminPublic,
  type SessionAdmin,
} from "@/lib/authorization/permissions";
import prisma from "@/lib/db/prisma";
import type {
  CreateAdminInput,
  ListAdminsQuery,
  UpdateAdminInput,
  UpdateProfileInput,
} from "@/lib/validations/admin";
import { AdminRole, Permission, type Admin, type Prisma } from "@prisma/client";
import type { AdminPublic } from "@/types";

function assertCanManageAdmins(actor: SessionAdmin): void {
  if (!isSuperAdmin(actor) && !actor.permissions.includes(Permission.MANAGE_ADMINS)) {
    throw new ForbiddenError("You do not have permission to manage admins");
  }
}

function assertCanManageTarget(actor: SessionAdmin, target: Admin): void {
  if (isSuperAdmin(actor)) {
    return;
  }

  if (target.role === AdminRole.SUPER_ADMIN) {
    throw new ForbiddenError("You cannot manage super admin accounts");
  }
}

function assertCanAssignRole(actor: SessionAdmin, role: AdminRole): void {
  if (role === AdminRole.SUPER_ADMIN && !isSuperAdmin(actor)) {
    throw new ForbiddenError("Only super admins can assign the super admin role");
  }
}

export async function listAdmins(query: ListAdminsQuery) {
  const { page, limit, search, sortBy, sortOrder, role, isActive } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.AdminWhereInput = {
    ...(role && { role }),
    ...(isActive !== undefined && { isActive }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.AdminOrderByWithRelationInput = (() => {
    switch (sortBy) {
      case "name":
        return { name: sortOrder };
      case "email":
        return { email: sortOrder };
      case "role":
        return { role: sortOrder };
      case "createdAt":
        return { createdAt: sortOrder };
      default:
        return { createdAt: sortOrder };
    }
  })();

  const [items, total] = await Promise.all([
    prisma.admin.findMany({
      where,
      select: ADMIN_PUBLIC_SELECT,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.admin.count({ where }),
  ]);

  return {
    items: items.map(toAdminPublic),
    pagination: { page, limit, total },
  };
}

export async function getAdminById(id: string): Promise<AdminPublic> {
  const admin = await prisma.admin.findUnique({
    where: { id },
    select: ADMIN_PUBLIC_SELECT,
  });

  if (!admin) {
    throw new NotFoundError("Admin not found");
  }

  return toAdminPublic(admin);
}

export async function createAdmin(
  actor: SessionAdmin,
  input: CreateAdminInput,
): Promise<AdminPublic> {
  assertCanManageAdmins(actor);
  assertCanAssignRole(actor, input.role);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: input.email },
  });

  if (existingAdmin) {
    throw new ConflictError("An admin with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);

  const admin = await prisma.admin.create({
    data: {
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      passwordHash,
      role: input.role,
      permissions: input.role === AdminRole.SUPER_ADMIN ? [] : input.permissions,
      isActive: input.isActive,
      profileImageUrl: input.profileImageUrl ?? null,
      profileImagePublicId: input.profileImagePublicId ?? null,
    },
    select: ADMIN_PUBLIC_SELECT,
  });

  return toAdminPublic(admin);
}

export async function updateAdmin(
  actor: SessionAdmin,
  id: string,
  input: UpdateAdminInput,
): Promise<AdminPublic> {
  assertCanManageAdmins(actor);

  const existingAdmin = await prisma.admin.findUnique({ where: { id } });

  if (!existingAdmin) {
    throw new NotFoundError("Admin not found");
  }

  assertCanManageTarget(actor, existingAdmin);

  if (input.role) {
    assertCanAssignRole(actor, input.role);
  }

  if (actor.id === id) {
    if (input.isActive === false) {
      throw new ForbiddenError("You cannot deactivate your own account");
    }

    if (input.role && input.role !== existingAdmin.role) {
      throw new ForbiddenError("You cannot change your own role");
    }
  }

  if (input.email && input.email !== existingAdmin.email) {
    const emailTaken = await prisma.admin.findUnique({
      where: { email: input.email },
    });

    if (emailTaken) {
      throw new ConflictError("An admin with this email already exists");
    }
  }

  const nextRole = input.role ?? existingAdmin.role;
  const nextPermissions =
    input.permissions ??
    (nextRole === AdminRole.SUPER_ADMIN ? [] : existingAdmin.permissions);

  const updateData: Prisma.AdminUpdateInput = {
    ...(input.name !== undefined && { name: input.name }),
    ...(input.email !== undefined && { email: input.email }),
    ...(input.phoneNumber !== undefined && { phoneNumber: input.phoneNumber }),
    ...(input.role !== undefined && { role: input.role }),
    ...(input.isActive !== undefined && { isActive: input.isActive }),
    ...(input.profileImageUrl !== undefined && {
      profileImageUrl: input.profileImageUrl,
    }),
    ...(input.profileImagePublicId !== undefined && {
      profileImagePublicId: input.profileImagePublicId,
    }),
    ...(input.permissions !== undefined || input.role !== undefined
      ? {
          permissions:
            nextRole === AdminRole.SUPER_ADMIN ? [] : nextPermissions,
        }
      : {}),
  };

  if (input.password) {
    updateData.passwordHash = await hashPassword(input.password);
  }

  const admin = await prisma.admin.update({
    where: { id },
    data: updateData,
    select: ADMIN_PUBLIC_SELECT,
  });

  return toAdminPublic(admin);
}

export async function updateOwnProfile(
  actor: SessionAdmin,
  input: UpdateProfileInput,
): Promise<AdminPublic> {
  const existingAdmin = await prisma.admin.findUnique({ where: { id: actor.id } });

  if (!existingAdmin) {
    throw new NotFoundError("Admin not found");
  }

  if (input.email !== existingAdmin.email) {
    const emailTaken = await prisma.admin.findUnique({
      where: { email: input.email },
    });

    if (emailTaken) {
      throw new ConflictError("An admin with this email already exists");
    }
  }

  const updateData: Prisma.AdminUpdateInput = {
    name: input.name,
    email: input.email,
    phoneNumber: input.phoneNumber,
    profileImageUrl: input.profileImageUrl ?? null,
    profileImagePublicId: input.profileImagePublicId ?? null,
  };

  if (input.password && input.password.length > 0) {
    updateData.passwordHash = await hashPassword(input.password);
  }

  const admin = await prisma.admin.update({
    where: { id: actor.id },
    data: updateData,
    select: ADMIN_PUBLIC_SELECT,
  });

  return toAdminPublic(admin);
}

export async function deleteAdmin(actor: SessionAdmin, id: string): Promise<void> {
  assertCanManageAdmins(actor);

  if (actor.id === id) {
    throw new ForbiddenError("You cannot delete your own account");
  }

  const existingAdmin = await prisma.admin.findUnique({ where: { id } });

  if (!existingAdmin) {
    throw new NotFoundError("Admin not found");
  }

  assertCanManageTarget(actor, existingAdmin);

  await prisma.admin.delete({ where: { id } });
}
