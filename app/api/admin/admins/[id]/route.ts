import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteAdmin,
  getAdminById,
  updateAdmin,
} from "@/lib/services/admin.service";
import { updateAdminSchema } from "@/lib/validations/admin";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const GET = withPermission(
  Permission.MANAGE_ADMINS,
  async (_request, context) => {
    const { id } = await context.params;
    const admin = await getAdminById(id);
    return successResponse(admin);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_ADMINS,
  async (request, context, actor) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateAdminSchema);
    const admin = await updateAdmin(actor, id, input);

    return successResponse(admin, { message: "Admin updated successfully" });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_ADMINS,
  async (_request, context, actor) => {
    const { id } = await context.params;
    await deleteAdmin(actor, id);

    return successResponse({ id }, { message: "Admin deleted successfully" });
  },
);
