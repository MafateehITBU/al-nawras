import { BlogCard } from "@/components/website/blog/blog-card";
import { FeaturedBlog } from "@/components/website/blog/featured-blog";
import { PopularTopics } from "@/components/website/blog/popular-topics";
import { SearchInsights } from "@/components/website/blog/search-insights";
import { StayInformed } from "@/components/website/blog/stay-informed";
import { WebsitePagination } from "@/components/website/blog/website-pagination";
import { AnimateIn } from "@/components/website/animate-in";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type {
  PublicBlogListItem,
  getPopularBlogCategories,
} from "@/lib/services/blog.service";
import { buildBlogListingQuery, getBlogListingPath } from "@/lib/website/paths";

type PopularCategory = Awaited<ReturnType<typeof getPopularBlogCategories>>[number];

export function BlogsPage({
  locale,
  featuredBlog,
  blogs,
  pagination,
  popularCategories,
  search,
  categoryId,
}: {
  locale: SupportedLocale;
  featuredBlog: PublicBlogListItem | null;
  blogs: PublicBlogListItem[];
  pagination: { page: number; totalPages: number };
  popularCategories: PopularCategory[];
  search?: string;
  categoryId?: string;
}) {
  const content = getBlogPageContent(locale);
  const basePath = getBlogListingPath(locale);
  const showFeatured = featuredBlog && !search && !categoryId && pagination.page === 1;

  const emptyMessage = search
    ? content.noSearchResults
    : categoryId
      ? content.noCategoryResults
      : content.noBlogs;

  return (
    <>
      {showFeatured && featuredBlog ? (
        <AnimateIn immediate variant="fade">
          <FeaturedBlog locale={locale} blog={featuredBlog} />
        </AnimateIn>
      ) : null}

      <section className="bg-website-bg py-10 sm:py-12 lg:py-14">
        <div className="website-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:gap-10 xl:gap-12">
            <div>
              {blogs.length > 0 ? (
                <ul className="space-y-5" role="list">
                  {blogs.map((blog, index) => (
                    <li key={blog.id}>
                      <AnimateIn variant="up" delay={index * 60}>
                        <BlogCard locale={locale} blog={blog} />
                      </AnimateIn>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-xl border border-dashed border-website-border bg-website-surface px-6 py-12 text-center">
                  <p className="website-body text-base text-website-muted">{emptyMessage}</p>
                </div>
              )}

              <WebsitePagination
                className="mt-8"
                page={pagination.page}
                totalPages={pagination.totalPages}
                previousLabel={content.previousPage}
                nextLabel={content.nextPage}
                buildHref={(page) =>
                  `${basePath}${buildBlogListingQuery({ page, search, categoryId })}`
                }
              />
            </div>

            <aside className="space-y-5">
              <SearchInsights
                locale={locale}
                initialSearch={search}
                categoryId={categoryId}
              />
              <PopularTopics
                locale={locale}
                categories={popularCategories}
                activeCategoryId={categoryId}
                search={search}
              />
              <StayInformed locale={locale} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
