import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicBlogDetail } from "@/lib/services/blog.service";
import { formatBlogDate } from "@/lib/utils/date";
import { formatReadingTime } from "@/lib/utils/reading-time";
import Image from "next/image";

export function BlogDetailsHero({
  locale,
  blog,
}: {
  locale: SupportedLocale;
  blog: PublicBlogDetail;
}) {
  const title = pickLocalizedField(blog, "title", locale);
  const categoryName = pickLocalizedField(blog.category, "name", locale);
  const hasImage = blog.featuredImageUrl.trim().length > 0;

  return (
    <section className="bg-website-surface pb-8 pt-10 sm:pb-10 sm:pt-12" aria-labelledby="blog-title">
      <div className="website-container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span
              className="size-2.5 shrink-0 rounded-full bg-website-secondary"
              aria-hidden
            />
            <span className="website-body rounded-full border border-website-muted bg-[#ECEEF0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#006689]">
              {categoryName}
            </span>
          </div>

          <h1
            id="blog-title"
            className="website-heading mt-5 text-[1.75rem] font-bold leading-tight text-website-text sm:text-[2.125rem] lg:text-[2.5rem]"
          >
            {title}
          </h1>

          <BlogMetaRow locale={locale} blog={blog} className="mt-5 justify-center" />
        </div>

        <div className="relative mx-auto mt-8 aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-website-bg sm:mt-10">
          {hasImage ? (
            <Image
              src={blog.featuredImageUrl}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-website-muted">—</div>
          )}
        </div>
      </div>
    </section>
  );
}

export function BlogMetaRow({
  locale,
  blog,
  className,
}: {
  locale: SupportedLocale;
  blog: Pick<PublicBlogDetail, "publishedAt" | "readingTimeMinutes" | "authorName">;
  className?: string;
}) {
  return (
    <ul
      className={`website-body flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-website-muted ${className ?? ""}`}
      role="list"
    >
      <li className="inline-flex items-center gap-2">
        <Icon icon="lucide:calendar" className="size-4 text-website-primary" aria-hidden />
        <time dateTime={new Date(blog.publishedAt).toISOString()}>
          {formatBlogDate(blog.publishedAt, locale)}
        </time>
      </li>
      <li className="inline-flex items-center gap-2">
        <Icon icon="lucide:clock" className="size-4 text-website-primary" aria-hidden />
        {formatReadingTime(blog.readingTimeMinutes, locale)}
      </li>
      <li className="inline-flex items-center gap-2">
        <Icon icon="lucide:user" className="size-4 text-website-primary" aria-hidden />
        {blog.authorName}
      </li>
    </ul>
  );
}
