import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicBlogListItem } from "@/lib/services/blog.service";
import { formatBlogDate } from "@/lib/utils/date";
import { formatReadingTime } from "@/lib/utils/reading-time";
import { excerptPlainText } from "@/lib/utils/text";
import { getBlogDetailPath } from "@/lib/website/paths";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function BlogReadMoreLink({
  locale,
  href,
  label,
  className,
}: {
  locale: SupportedLocale;
  href: string;
  label?: string;
  className?: string;
}) {
  const content = getBlogPageContent(locale);
  const text = label ?? content.readMore;

  return (
    <Link
      href={href}
      className={cn(
        "website-body inline-flex items-center gap-1.5 text-base font-semibold uppercase tracking-wide text-website-primary transition-opacity hover:opacity-80 website-focus-ring",
        className,
      )}
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
    <article className="border-b border-website-border bg-website-surface">
      <div className="flex flex-col sm:flex-row">
        <div className="flex shrink-0 flex-col gap-4 px-5 py-7 sm:w-[13rem] sm:px-6">
          <div className="website-body space-y-2 text-sm text-website-text">
            <p>{formatBlogDate(blog.publishedAt, locale)}</p>
            <p className="inline-flex items-center gap-1.5">
              <Icon icon="lucide:clock" className="size-4" aria-hidden />
              {formatReadingTime(blog.readingTimeMinutes, locale)}
            </p>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-website-bg sm:max-w-[10.5rem]">
            {hasImage ? (
              <Image
                src={blog.featuredImageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 168px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-website-text">—</div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 py-7 sm:px-6">
          <p className="website-body text-xs font-semibold uppercase tracking-[0.14em] text-website-secondary">
            {categoryName}
          </p>
          <h2 className="website-heading mt-2 line-clamp-2 text-[1.35rem] font-bold text-website-text sm:text-2xl">
            <Link href={href} className="transition-colors hover:text-website-primary website-focus-ring">
              {title}
            </Link>
          </h2>
          <p className="website-body mt-3 line-clamp-3 text-base leading-relaxed text-website-text">
            {excerpt}
          </p>
          <div className="mt-4">
            <BlogReadMoreLink locale={locale} href={href} className="text-sm" />
          </div>
        </div>
      </div>
    </article>
  );
}
