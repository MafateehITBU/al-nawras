import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteService,
  getServiceById,
  updateService,
} from "@/lib/services/service.service";
import { updateServiceSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_SERVICES,
  async (_request, context) => {
    const { id } = await context.params;
    const service = await getServiceById(id);
    return successResponse(service);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_SERVICES,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateServiceSchema);
    const service = await updateService(id, input);

    return successResponse(service, { message: "Service updated successfully" });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_SERVICES,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteService(id);
    return successResponse({ id }, { message: "Service deleted successfully" });
  },
);
