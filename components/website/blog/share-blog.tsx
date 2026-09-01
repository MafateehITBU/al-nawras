"use client";

import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { useCallback, useState } from "react";

export function ShareBlog({
  locale,
  url,
}: {
  locale: SupportedLocale;
  url: string;
}) {
  const content = getBlogPageContent(locale);
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        // Fall through to copy.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [url]);

  return (
    <div className="border-t border-website-border pt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="website-body text-sm font-semibold uppercase tracking-[0.14em] text-website-text">
          {content.share}:
        </span>
        <button
          type="button"
          onClick={() => void handleShare()}
          className="inline-flex size-9 items-center justify-center rounded-full border border-website-border text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring"
          aria-label={content.share}
        >
          <Icon icon="lucide:share-2" className="size-4" aria-hidden />
        </button>
        {copied ? (
          <span className="website-body text-sm text-website-primary" role="status">
            {content.linkCopied}
          </span>
        ) : null}
      </div>
    </div>
  );
}
