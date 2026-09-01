import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicBlogListItem } from "@/lib/services/blog.service";
import { formatBlogDate } from "@/lib/utils/date";
import { formatReadingTime } from "@/lib/utils/reading-time";
import { excerptPlainText } from "@/lib/utils/text";
import { getBlogDetailPath } from "@/lib/website/paths";
import Image from "next/image";
import Link from "next/link";

export function BlogReadMoreLink({
  locale,
  href,
  label,
}: {
  locale: SupportedLocale;
  href: string;
  label?: string;
}) {
  const content = getBlogPageContent(locale);
  const text = label ?? content.readMore;

  return (
    <Link
      href={href}
      className="website-body inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-website-primary transition-opacity hover:opacity-80 website-focus-ring"
    >
      {text}
      <Icon icon="lucide:arrow-right" className="size-4 rtl:rotate-180" aria-hidden />
    </Link>
  );
}

export function BlogCard({
  locale,
  blog,
}: {
  locale: SupportedLocale;
  blog: PublicBlogListItem;
}) {
  const title = pickLocalizedField(blog, "title", locale);
  const content = pickLocalizedField(blog, "content", locale);
  const categoryName = pickLocalizedField(blog.category, "name", locale);
  const excerpt = excerptPlainText(content, 160);
  const href = getBlogDetailPath(blog.slug, locale);
  const hasImage = blog.featuredImageUrl.trim().length > 0;

  return (
    <article className="overflow-hidden rounded-xl border border-website-border bg-website-surface">
      <div className="flex flex-col sm:flex-row">
        <div className="flex shrink-0 flex-col gap-3 p-4 sm:w-[11.5rem] sm:p-3">
          <div className="website-body space-y-2 text-xs text-website-muted">
            <p>{formatBlogDate(blog.publishedAt, locale)}</p>
            <p className="inline-flex items-center gap-1.5">
              <Icon icon="lucide:clock" className="size-3.5" aria-hidden />
              {formatReadingTime(blog.readingTimeMinutes, locale)}
            </p>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-website-bg sm:max-w-[9.5rem]">
            {hasImage ? (
              <Image
                src={blog.featuredImageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 152px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-website-muted">—</div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center border-t border-website-border p-4 sm:border-t-0 sm:border-s sm:py-5 sm:pe-5">
          <p className="website-body text-xs font-semibold uppercase tracking-[0.14em] text-website-secondary">
            {categoryName}
          </p>
          <h2 className="website-heading mt-2 line-clamp-2 text-xl font-bold text-website-text sm:text-[1.35rem]">
            <Link href={href} className="transition-colors hover:text-website-primary website-focus-ring">
              {title}
            </Link>
          </h2>
          <p className="website-body mt-3 line-clamp-3 text-sm leading-relaxed text-website-muted">
            {excerpt}
          </p>
          <div className="mt-4">
            <BlogReadMoreLink locale={locale} href={href} />
          </div>
        </div>
      </div>
    </article>
  );
}
