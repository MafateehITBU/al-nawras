"use client";

import { IconifyIcon } from "@/components/website/service/iconify-icon";
import type { AboutFirmExpertisePoint } from "@/lib/i18n/about-page-content";

export function FirmExpertisePoint({ point }: { point: AboutFirmExpertisePoint }) {
  return (
    <article className="flex gap-3">
      <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-website-secondary">
        <IconifyIcon icon="mdi:check" className="size-3 text-website-secondary" />
      </div>
      <div className="min-w-0">
        <h3 className="website-heading text-base font-semibold text-website-text sm:text-lg">
          {point.title}
        </h3>
        <p className="website-body mt-1 text-sm font-light leading-relaxed text-[#44474C] sm:text-[0.9375rem]">
          {point.description}
        </p>
      </div>
    </article>
  );
}
