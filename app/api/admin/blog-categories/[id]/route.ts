import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import {
  deleteBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
} from "@/lib/services/blog-category.service";
import { updateBlogCategorySchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_BLOGS,
  async (_request, context) => {
    const { id } = await context.params;
    const category = await getBlogCategoryById(id);
    return successResponse(category);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_BLOGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateBlogCategorySchema);
    const category = await updateBlogCategory(id, input);

    return successResponse(category, {
      message: "Blog category updated successfully",
    });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_BLOGS,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteBlogCategory(id);
    return successResponse({ id }, { message: "Blog category deleted successfully" });
  },
);
