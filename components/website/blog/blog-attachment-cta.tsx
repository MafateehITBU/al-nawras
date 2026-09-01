import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicBlogDetail } from "@/lib/services/blog.service";
import { getBlogAttachmentDownloadPath } from "@/lib/website/paths";
import Image from "next/image";
import Link from "next/link";

export function BlogAttachmentCta({
  locale,
  blog,
}: {
  locale: SupportedLocale;
  blog: PublicBlogDetail;
}) {
  if (!blog.attachmentUrl) return null;

  const content = getBlogPageContent(locale);
  const attachmentName =
    blog.attachmentName?.trim() ||
    (blog.attachmentFormat
      ? `${content.download}.${blog.attachmentFormat}`
      : content.download);

  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-website-footer">
      <Image
        src="/images/blog-cta.png"
        alt=""
        fill
        className="object-cover"
        sizes="320px"
        aria-hidden
      />
      <div className="relative z-10 p-5 text-white">
        <Icon icon="lucide:file-text" className="size-6 text-website-secondary" aria-hidden />
        <p className="website-body mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
          {content.download}
        </p>
        <p className="website-heading mt-2 text-lg font-bold leading-snug">{attachmentName}</p>
        <Link
          href={getBlogAttachmentDownloadPath(blog.slug)}
          className="website-body mt-5 inline-flex w-full items-center justify-center rounded-lg bg-website-secondary py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-website-secondary-hover website-focus-ring"
        >
          {content.getTheReport}
        </Link>
      </div>
    </div>
  );
}
