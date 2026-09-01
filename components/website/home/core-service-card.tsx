"use client";

import { IconifyIcon } from "@/components/website/service/iconify-icon";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { HomeCoreService } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { getServiceCategoryPath } from "@/lib/website/paths";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function CoreServiceCard({
  service,
  locale,
}: {
  service: HomeCoreService;
  locale: SupportedLocale;
}) {
  const { readMore } = getDictionary(locale).actions;
  const href = getServiceCategoryPath(service.slug, locale);

  return (
    <article className="group flex h-[300px] w-full min-w-0 max-w-[290px] flex-col overflow-hidden rounded-2xl border border-website-card-dark-border bg-website-card-dark p-5 transition-colors duration-300 hover:border-website-primary sm:h-[340px] sm:max-w-[328px] sm:p-6 lg:h-[376px] lg:max-w-none lg:w-full">
      <div className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
        <IconifyIcon
          icon={service.icon}
          className="size-9 text-website-primary sm:size-10"
        />
      </div>
      <h3 className="website-heading mt-4 shrink-0 [overflow-wrap:anywhere] text-xl font-semibold text-white sm:mt-5 sm:text-[1.375rem]">
        {service.title}
      </h3>
      <p className="website-body mt-3 min-h-0 flex-1 overflow-hidden [overflow-wrap:anywhere] text-sm font-light leading-relaxed text-website-muted line-clamp-4 sm:text-[0.9375rem]">
        {service.description}
      </p>
      <Link
        href={href}
        className="website-body mt-auto inline-flex shrink-0 items-center gap-1 pt-4 text-sm font-medium text-website-primary transition-colors hover:text-website-primary-hover website-focus-ring"
      >
        {readMore}
        <Icon
          icon="lucide:arrow-right"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          aria-hidden
        />
      </Link>
    </article>
  );
}
