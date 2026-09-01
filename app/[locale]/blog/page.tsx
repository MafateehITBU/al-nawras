import { BlogsPage } from "@/components/website/blog/blogs-page";
import { getBlogPageContent, PUBLIC_BLOG_PAGE_SIZE } from "@/lib/i18n/blog-page-content";
import { isSupportedLocale } from "@/lib/i18n/config";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import {
  getFeaturedPublicBlog,
  getPopularBlogCategories,
  listPublicBlogs,
} from "@/lib/services/blog.service";
import { publicBlogListQuerySchema } from "@/lib/validations/content";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) return {};

  const content = getBlogPageContent(localeParam);
  return buildWebsiteMetadata({
    locale: localeParam,
    title: localeParam === "ar" ? "المقالات والرؤى" : "Insights & Articles",
    description: content.seo.description,
    path: "/blog",
  });
}

export default async function BlogListingPage({
  params,
  searchParams,
}: PageProps<"/[locale]/blog"> & {
  searchParams: Promise<{ page?: string; search?: string; categoryId?: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  const rawSearchParams = await searchParams;
  const query = publicBlogListQuerySchema.parse({
    page: rawSearchParams.page,
    limit: PUBLIC_BLOG_PAGE_SIZE,
    search: rawSearchParams.search,
    categoryId: rawSearchParams.categoryId,
  });

  const [featuredBlog, popularCategories] = await Promise.all([
    getFeaturedPublicBlog(),
    getPopularBlogCategories(),
  ]);

  const shouldExcludeFeatured =
    featuredBlog &&
    !query.search &&
    !query.categoryId &&
    query.page === 1;

  const { items, pagination } = await listPublicBlogs({
    ...query,
    excludeId: shouldExcludeFeatured ? featuredBlog.id : undefined,
  });

  return (
    <BlogsPage
      locale={localeParam}
      featuredBlog={featuredBlog}
      blogs={items}
      pagination={{
        page: pagination.page,
        totalPages: pagination.totalPages,
      }}
      popularCategories={popularCategories}
      search={query.search}
      categoryId={query.categoryId}
    />
  );
}
