"use client";

import { IconifyIcon } from "@/components/website/service/iconify-icon";
import type { AboutExpertiseCard } from "@/lib/i18n/about-page-content";
import { cn } from "@/lib/utils";

export function ExpertiseCard({
  card,
  isActive = false,
}: {
  card: AboutExpertiseCard;
  isActive?: boolean;
}) {
  return (
    <article
      className={cn(
        "group mx-auto flex h-[330px] w-full flex-col rounded-xl border bg-website-bg p-6 transition-all duration-500 ease-in-out motion-reduce:transition-none",
        isActive
          ? "border-website-primary shadow-lg shadow-website-primary/10"
          : "border-website-muted hover:border-website-primary/60",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col transition-transform duration-500 ease-in-out motion-reduce:transition-none",
          !isActive && "group-hover:-translate-y-1",
        )}
      >
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
