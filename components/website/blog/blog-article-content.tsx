import type { SupportedLocale } from "@/lib/i18n/config";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { PublicBlogDetail } from "@/lib/services/blog.service";
import { sanitizeBlogHtml } from "@/lib/utils/sanitize-html";

export function BlogArticleContent({
  locale,
  blog,
}: {
  locale: SupportedLocale;
  blog: PublicBlogDetail;
}) {
  const html = pickLocalizedField(blog, "content", locale);
  const sanitized = sanitizeBlogHtml(html);

  return (
    <article
      className="blog-prose website-body max-w-none text-base leading-relaxed text-website-text"
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
