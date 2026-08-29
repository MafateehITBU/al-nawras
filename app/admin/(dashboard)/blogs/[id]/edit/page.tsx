import { BlogFormPage } from "@/components/features/blogs/blog-form-page";

export default async function AdminEditBlogRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogFormPage blogId={id} />;
}
