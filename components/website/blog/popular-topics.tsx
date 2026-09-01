import { pickLocalizedField } from "@/lib/i18n/content";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPopularBlogCategories } from "@/lib/services/blog.service";
import { buildBlogListingQuery, getBlogListingPath } from "@/lib/website/paths";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PopularCategory = Awaited<ReturnType<typeof getPopularBlogCategories>>[number];

export function PopularTopics({
  locale,
  categories,
  activeCategory,
  search,
}: {
  locale: SupportedLocale;
  categories: PopularCategory[];
  activeCategory?: string;
  search?: string;
}) {
  const content = getBlogPageContent(locale);
  const base = getBlogListingPath(locale);

  return (
    <div className="rounded-xl border border-website-border bg-website-surface p-5">
      <h2 className="website-heading text-lg font-bold text-website-text">
        {content.popularTopics}
      </h2>
      <ul className="mt-4 space-y-1" role="list">
        {categories.map((category) => {
          const isActive = category.slug === activeCategory;
          const href = `${base}${buildBlogListingQuery({
            category: isActive ? undefined : category.slug,
            search,
            page: 1,
          })}`;

          return (
            <li key={category.id}>
              <Link
                href={href}
                className={cn(
                  "website-body flex items-center justify-between rounded-lg px-2 py-2.5 text-sm transition-colors website-focus-ring",
                  isActive
                    ? "font-semibold text-website-secondary"
                    : "text-website-text hover:bg-website-bg hover:text-website-primary",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span>{pickLocalizedField(category, "name", locale)}</span>
                <span className={cn(isActive ? "text-website-secondary" : "text-website-text")}>
                  {category.blogCount}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
