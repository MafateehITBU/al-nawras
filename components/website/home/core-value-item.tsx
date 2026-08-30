"use client";

import { IconifyIcon } from "@/components/website/service/iconify-icon";
import type { HomeCoreValue } from "@/lib/i18n/home-page-content";

export function CoreValueItem({ value }: { value: HomeCoreValue }) {
  return (
    <article className="flex gap-4 text-website-text">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-website-secondary">
        <IconifyIcon icon={value.icon} className="size-6 text-website-text" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="website-heading text-lg font-semibold text-website-text">
          {value.title}
        </h3>
        <p className="website-body mt-0.5 text-base font-medium text-website-secondary">
          {value.supportingStatement}
        </p>
        <p className="website-body mt-2 text-base font-light leading-relaxed text-website-text">
          {value.description}
        </p>
      </div>
    </article>
  );
}
