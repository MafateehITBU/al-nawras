import { withPermission } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { deleteBlog, getBlogById, updateBlog } from "@/lib/services/blog.service";
import { updateBlogSchema } from "@/lib/validations/content";
import { parseJsonBody } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(
  Permission.MANAGE_BLOGS,
  async (_request, context) => {
    const { id } = await context.params;
    const blog = await getBlogById(id);
    return successResponse(blog);
  },
);

export const PATCH = withPermission(
  Permission.MANAGE_BLOGS,
  async (request, context) => {
    const { id } = await context.params;
    const input = await parseJsonBody(request, updateBlogSchema);
    const blog = await updateBlog(id, input);

    return successResponse(blog, { message: "Blog updated successfully" });
  },
);

export const DELETE = withPermission(
  Permission.MANAGE_BLOGS,
  async (_request, context) => {
    const { id } = await context.params;
    await deleteBlog(id);
    return successResponse({ id }, { message: "Blog deleted successfully" });
  },
);
