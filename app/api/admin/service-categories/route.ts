import { withPermission } from "@/lib/api/handler";
import { paginatedResponse, successResponse } from "@/lib/api/response";
import {
  createServiceCategory,
  listServiceCategories,
} from "@/lib/services/service-category.service";
import {
  createServiceCategorySchema,
  listServiceCategoriesQuerySchema,
} from "@/lib/validations/content";
import { parseJsonBody, parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_SERVICES, async (request) => {
  const query = parseSearchParams(
    request.nextUrl.searchParams,
    listServiceCategoriesQuerySchema,
  );
  const result = await listServiceCategories(query);
  return paginatedResponse(result.items, result.pagination);
});

export const POST = withPermission(Permission.MANAGE_SERVICES, async (request) => {
  const input = await parseJsonBody(request, createServiceCategorySchema);
  const category = await createServiceCategory(input);

  return successResponse(category, {
    message: "Service category created successfully",
    status: 201,
  });
});
