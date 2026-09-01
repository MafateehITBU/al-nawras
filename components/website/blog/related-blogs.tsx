import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { RelatedBlogSummary } from "@/lib/services/blog.service";
import { formatBlogDate } from "@/lib/utils/date";
import { getBlogDetailPath } from "@/lib/website/paths";
import Link from "next/link";

export function RelatedBlogs({
  locale,
  blogs,
}: {
  locale: SupportedLocale;
  blogs: RelatedBlogSummary[];
}) {
  if (blogs.length === 0) return null;

  const content = getBlogPageContent(locale);

  return (
    <div className="rounded-xl border border-[#006689] bg-website-bg p-5">
      <h2 className="website-body text-xs font-semibold uppercase tracking-[0.16em] text-website-text">
        {content.relatedArticles}
      </h2>
      <div className="mt-3 border-b border-[#006689]/30" aria-hidden />
      <ul className="mt-4 space-y-5" role="list">
        {blogs.map((blog) => {
          const title = pickLocalizedField(blog, "title", locale);
          const categoryName = pickLocalizedField(blog.category, "name", locale);

          return (
            <li key={blog.id}>
              <article>
                <p className="website-body flex flex-wrap items-center gap-2 text-xs text-[#006689]">
                  <time dateTime={new Date(blog.publishedAt).toISOString()}>
                    {formatBlogDate(blog.publishedAt, locale)}
                  </time>
                  <span aria-hidden>•</span>
                  <span>{categoryName}</span>
                </p>
                <h3 className="website-heading mt-2 text-lg font-bold leading-snug text-website-text">
                  <Link
                    href={getBlogDetailPath(blog.slug, locale)}
                    className="transition-colors hover:text-website-primary website-focus-ring"
                  >
                    {title}
                  </Link>
                </h3>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
