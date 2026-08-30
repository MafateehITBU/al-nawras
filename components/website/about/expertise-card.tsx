"use client";

import { IconifyIcon } from "@/components/website/service/iconify-icon";
import type { AboutExpertiseCard } from "@/lib/i18n/about-page-content";

export function ExpertiseCard({ card }: { card: AboutExpertiseCard }) {
  return (
    <article className="group mx-auto flex h-[330px] w-full max-w-[421px] flex-col rounded-xl border border-website-muted bg-website-bg p-6 transition-colors duration-300 hover:border-website-primary">
      <div className="flex h-full flex-col transition-transform duration-300 group-hover:-translate-y-1">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: "#27A8E11A" }}
        >
          <IconifyIcon icon={card.icon} className="size-7 text-website-primary" />
        </div>

        <h3 className="website-heading mt-4 line-clamp-2 text-lg font-semibold leading-snug text-website-text">
          {card.title}
        </h3>

        <p className="website-body mt-3 flex-1 overflow-hidden whitespace-pre-line text-[0.9375rem] font-light leading-relaxed text-[#44474C]">
          {card.description}
        </p>
      </div>
    </article>
  );
}
