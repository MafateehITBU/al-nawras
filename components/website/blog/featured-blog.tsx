import { BlogReadMoreLink } from "@/components/website/blog/blog-card";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicBlogListItem } from "@/lib/services/blog.service";
import { formatBlogDate } from "@/lib/utils/date";
import { excerptPlainText } from "@/lib/utils/text";
import { getBlogDetailPath } from "@/lib/website/paths";
import Image from "next/image";
import Link from "next/link";

export function FeaturedBlog({
  locale,
  blog,
}: {
  locale: SupportedLocale;
  blog: PublicBlogListItem;
}) {
  const content = getBlogPageContent(locale);
  const title = pickLocalizedField(blog, "title", locale);
  const body = pickLocalizedField(blog, "content", locale);
  const excerpt = excerptPlainText(body, 220);
  const href = getBlogDetailPath(blog.slug, locale);
  const hasImage = blog.featuredImageUrl.trim().length > 0;

  return (
    <section className="bg-website-surface py-10 sm:py-12 lg:py-14" aria-labelledby="featured-blog-title">
      <div className="website-container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-website-bg lg:aspect-[5/4]">
            {hasImage ? (
              <Image
                src={blog.featuredImageUrl}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-website-muted">—</div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="website-body rounded-full bg-[#EDF9FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-website-primary">
                {content.featuredBadge}
              </span>
              <time
                dateTime={new Date(blog.publishedAt).toISOString()}
                className="website-body text-sm text-website-muted"
              >
                {formatBlogDate(blog.publishedAt, locale)}
              </time>
            </div>

            <h1
              id="featured-blog-title"
              className="website-heading mt-5 text-[1.75rem] font-bold leading-tight text-website-text sm:text-[2rem] lg:text-[2.25rem]"
            >
              <Link href={href} className="transition-colors hover:text-website-primary website-focus-ring">
                {title}
              </Link>
            </h1>

            <p className="website-body mt-4 text-base leading-relaxed text-website-muted sm:text-[1.0625rem]">
              {excerpt}
            </p>

            <div className="mt-6">
              <BlogReadMoreLink locale={locale} href={href} label={content.readFullBlog} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
