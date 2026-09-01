"use client";

import { Icon } from "@iconify/react";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { buildBlogListingQuery, getBlogListingPath } from "@/lib/website/paths";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchInsights({
  locale,
  initialSearch,
  category,
}: {
  locale: SupportedLocale;
  initialSearch?: string;
  category?: string;
}) {
  const router = useRouter();
  const content = getBlogPageContent(locale);
  const [value, setValue] = useState(initialSearch ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setValue(initialSearch ?? "");
  }, [initialSearch]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const base = getBlogListingPath(locale);
      const query = buildBlogListingQuery({
        search: value,
        category,
        page: 1,
      });
      router.push(`${base}${query}`);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, locale, category, router]);

  return (
    <div className="rounded-xl border border-website-border bg-website-surface p-5">
      <h2 className="website-heading text-lg font-bold text-website-text">
        {content.searchInsights}
      </h2>
      <div className="relative mt-4">
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={content.searchPlaceholder}
          className={cn(
            "website-body w-full rounded-lg border border-website-border bg-website-surface py-2.5 pe-10 ps-3 text-sm text-website-text placeholder:text-website-muted website-focus-ring",
          )}
          aria-label={content.searchInsights}
        />
        <Icon
          icon="lucide:search"
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-website-muted"
          aria-hidden
        />
      </div>
    </div>
  );
}
