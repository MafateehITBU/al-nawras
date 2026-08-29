import { withPermission } from "@/lib/api/handler";
import { paginatedResponse, successResponse } from "@/lib/api/response";
import {
  createBlogCategory,
  listBlogCategories,
} from "@/lib/services/blog-category.service";
import {
  createBlogCategorySchema,
  listBlogCategoriesQuerySchema,
} from "@/lib/validations/content";
import { parseJsonBody, parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_BLOGS, async (request) => {
  const query = parseSearchParams(
    request.nextUrl.searchParams,
    listBlogCategoriesQuerySchema,
  );
  const result = await listBlogCategories(query);
  return paginatedResponse(result.items, result.pagination);
});

export const POST = withPermission(Permission.MANAGE_BLOGS, async (request) => {
  const input = await parseJsonBody(request, createBlogCategorySchema);
  const category = await createBlogCategory(input);

  return successResponse(category, {
    message: "Blog category created successfully",
    status: 201,
  });
});
