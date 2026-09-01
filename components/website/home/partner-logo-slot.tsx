import { Icon } from "@iconify/react";
import type { HomePartner } from "@/lib/i18n/home-page-content";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function PartnerLogoSlot({
  partner,
  placeholderLabel,
  isPlaceholder = false,
  className,
}: {
  partner: Pick<HomePartner, "id" | "name" | "logoUrl" | "websiteUrl">;
  placeholderLabel: string;
  isPlaceholder?: boolean;
  className?: string;
}) {
  const hasLogo = Boolean(partner.logoUrl?.trim());

  const content = (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center justify-center rounded-xl border border-website-border/80 bg-website-surface px-5 transition-colors hover:border-website-primary/35 sm:h-16 sm:px-6",
        className,
      )}
    >
      {hasLogo ? (
        <div className="relative h-8 w-[6.5rem] sm:h-9 sm:w-[7.5rem]">
          <Image
            src={partner.logoUrl!}
            alt={partner.name}
            fill
            className="object-contain object-center grayscale transition-[filter] hover:grayscale-0"
            sizes="120px"
          />
        </div>
      ) : (
        <div className="flex min-w-[6.5rem] items-center justify-center gap-2 text-website-muted sm:min-w-[7.5rem]">
          <Icon icon="lucide:landmark" className="size-4 shrink-0" aria-hidden />
          <span className="website-body truncate text-[0.6875rem] font-medium uppercase tracking-wide sm:text-xs">
            {isPlaceholder ? placeholderLabel : partner.name}
          </span>
        </div>
      )}
    </div>
  );

  if (partner.websiteUrl?.trim()) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="website-focus-ring block shrink-0 rounded-xl"
        aria-label={partner.name}
      >
        {content}
      </a>
    );
  }

  return content;
}
