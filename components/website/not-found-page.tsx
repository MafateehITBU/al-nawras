"use client";

import { PrimaryButton } from "@/components/website/primary-button";
import { DEFAULT_LOCALE } from "@/constants";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isSupportedLocale, localizePath } from "@/lib/i18n/config";
import { usePathname } from "next/navigation";

export function WebsiteNotFoundPage() {
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  const locale = isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
  const content = getDictionary(locale).notFound;

  return (
    <section
      className="website-container flex flex-1 flex-col items-center justify-center py-20 text-center sm:py-28"
      aria-labelledby="not-found-title"
    >
      <p className="website-heading text-sm font-semibold uppercase tracking-[0.24em] text-website-primary">
        404
      </p>
      <h1
        id="not-found-title"
        className="website-heading mt-3 text-3xl font-bold text-website-text sm:text-4xl lg:text-[2.75rem]"
      >
        {content.title}
      </h1>
      <p className="website-body mt-4 max-w-lg text-base font-light leading-relaxed text-website-hero-description sm:text-lg">
        {content.description}
      </p>
      <PrimaryButton href={localizePath("/", locale)} className="mt-8">
        {content.backHome}
      </PrimaryButton>
    </section>
  );
}
