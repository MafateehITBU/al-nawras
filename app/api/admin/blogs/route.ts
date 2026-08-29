import { withPermission } from "@/lib/api/handler";
import { paginatedResponse, successResponse } from "@/lib/api/response";
import { createBlog, listBlogs } from "@/lib/services/blog.service";
import { createBlogSchema, listBlogsQuerySchema } from "@/lib/validations/content";
import { parseJsonBody, parseSearchParams } from "@/lib/validations/common";
import { Permission } from "@prisma/client";

export const GET = withPermission(Permission.MANAGE_BLOGS, async (request) => {
  const query = parseSearchParams(request.nextUrl.searchParams, listBlogsQuerySchema);
  const result = await listBlogs(query);
  return paginatedResponse(result.items, result.pagination);
});

export const POST = withPermission(Permission.MANAGE_BLOGS, async (request) => {
  const input = await parseJsonBody(request, createBlogSchema);
  const blog = await createBlog(input);

  return successResponse(blog, {
    message: "Blog created successfully",
    status: 201,
  });
});
