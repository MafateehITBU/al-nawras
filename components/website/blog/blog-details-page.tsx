import { BlogArticleContent } from "@/components/website/blog/blog-article-content";
import { BlogAttachmentCta } from "@/components/website/blog/blog-attachment-cta";
import { BlogDetailsHero } from "@/components/website/blog/blog-details-hero";
import { RelatedBlogs } from "@/components/website/blog/related-blogs";
import { ShareBlog } from "@/components/website/blog/share-blog";
import { AnimateIn } from "@/components/website/animate-in";
import type { SupportedLocale } from "@/lib/i18n/config";
import { getSiteUrl, localizePath } from "@/lib/i18n/config";
import type { getPublicBlogPageData } from "@/lib/services/blog.service";

type BlogPageData = Awaited<ReturnType<typeof getPublicBlogPageData>>;

export function BlogDetailsPage({
  locale,
  data,
}: {
  locale: SupportedLocale;
  data: BlogPageData;
}) {
  const { blog, relatedBlogs } = data;
  const shareUrl = `${getSiteUrl()}${localizePath(`/blog/${blog.slug}`, locale)}`;

  return (
    <>
      <AnimateIn immediate variant="fade">
        <BlogDetailsHero locale={locale} blog={blog} />
      </AnimateIn>

      <section className="bg-website-surface pb-12 pt-2 sm:pb-16">
        <div className="website-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:gap-10 xl:gap-12">
            <div>
              <AnimateIn variant="up">
                <BlogArticleContent locale={locale} blog={blog} />
              </AnimateIn>
              <ShareBlog locale={locale} url={shareUrl} />
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <BlogAttachmentCta locale={locale} blog={blog} />
              <RelatedBlogs locale={locale} blogs={relatedBlogs} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
