import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteServiceCategory,
  getServiceCategoryById,
  updateServiceCategory,
} from "@/lib/services/service-category.service";
import { updateServiceCategorySchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_SERVICES,
  async (_request, context) => {
    const { id } = await context.params;
    const category = await getServiceCategoryById(id);
    return successResponse(category);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_SERVICES,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateServiceCategorySchema);
    const category = await updateServiceCategory(id, input);

    return successResponse(category, {
      message: "Service category updated successfully",
    });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_SERVICES,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteServiceCategory(id);
    return successResponse({ id }, {
      message: "Service category deleted successfully",
    });
  },
);
