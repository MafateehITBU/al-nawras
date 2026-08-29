import { withPermission } from "@/lib/api/handler";
import { paginatedResponse, successResponse } from "@/lib/api/response";
import { createAdmin, listAdmins } from "@/lib/services/admin.service";
import {
  createAdminSchema,
  listAdminsQuerySchema,
} from "@/lib/validations/admin";
import { parseJsonBody, parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_ADMINS, async (request) => {
  const query = parseSearchParams(request.nextUrl.searchParams, listAdminsQuerySchema);
  const result = await listAdmins(query);

  return paginatedResponse(result.items, result.pagination);
});

export const POST = withPermission(
  Permission.MANAGE_ADMINS,
  async (request, _context, actor) => {
    const input = await parseJsonBody(request, createAdminSchema);
    const admin = await createAdmin(actor, input);

    return successResponse(admin, {
      message: "Admin created successfully",
      status: 201,
    });
  },
);
