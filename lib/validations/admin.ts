import {
  emailSchema,
  paginationQuerySchema,
  passwordSchema,
  phoneSchema,
} from "@/lib/validations/common";
import { AdminRole, Permission } from "@prisma/client";
import { z } from "zod";

const adminRoleSchema = z.nativeEnum(AdminRole);
const permissionSchema = z.nativeEnum(Permission);

export const createAdminSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    email: emailSchema,
    phoneNumber: phoneSchema,
    password: passwordSchema,
    role: adminRoleSchema.default(AdminRole.ADMIN),
    permissions: z.array(permissionSchema).default([]),
    isActive: z.boolean().default(true),
    profileImageUrl: z.string().url().optional().nullable(),
    profileImagePublicId: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.role === AdminRole.ADMIN && data.permissions.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Regular admins must have at least one permission",
        path: ["permissions"],
      });
    }

    if (data.role === AdminRole.SUPER_ADMIN && data.permissions.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Super admins do not need explicit permissions",
        path: ["permissions"],
      });
    }
  });

export const updateAdminSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    email: emailSchema.optional(),
    phoneNumber: phoneSchema.optional(),
    password: passwordSchema.optional(),
    role: adminRoleSchema.optional(),
    permissions: z.array(permissionSchema).optional(),
    isActive: z.boolean().optional(),
    profileImageUrl: z.string().url().optional().nullable(),
    profileImagePublicId: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.role === AdminRole.ADMIN && data.permissions?.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Regular admins must have at least one permission",
        path: ["permissions"],
      });
    }

    if (data.role === AdminRole.SUPER_ADMIN && (data.permissions?.length ?? 0) > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Super admins do not need explicit permissions",
        path: ["permissions"],
      });
    }
  });

export const listAdminsQuerySchema = paginationQuerySchema.extend({
  role: adminRoleSchema.optional(),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminSchema>;
export type ListAdminsQuery = z.infer<typeof listAdminsQuerySchema>;

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: emailSchema,
  phoneNumber: phoneSchema,
  password: z.union([passwordSchema, z.literal("")]).optional(),
  profileImageUrl: z.string().url().optional().nullable(),
  profileImagePublicId: z.string().optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
