import { withHandler } from "@/lib/api/handler";
import { successResponse } from "@/lib/api/response";
import { getPopularBlogCategories } from "@/lib/services/blog.service";

export const GET = withHandler(async () => {
  const categories = await getPopularBlogCategories();
  return successResponse(categories);
});
