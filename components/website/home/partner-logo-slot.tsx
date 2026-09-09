import { cn } from "@/lib/utils";
import type { HomePartner } from "@/lib/i18n/home-page-content";
import Image from "next/image";

export function PartnerLogoSlot({
  partner,
  className,
}: {
  partner: Pick<HomePartner, "id" | "name" | "logoUrl">;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-16 shrink-0 items-center gap-3 rounded-full border border-white/10 bg-website-card-dark pe-5 ps-2 sm:h-[4.25rem] sm:gap-3.5 sm:pe-6 sm:ps-2.5",
        "transition-colors duration-300 hover:border-website-primary/45 hover:bg-[#404449]",
        className,
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-website-surface sm:size-14">
        <div className="relative h-7 w-9 sm:h-8 sm:w-10">
          <Image
            src={partner.logoUrl}
            alt=""
            fill
            className="object-contain object-center opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            sizes="56px"
          />
        </div>
      </div>
      <span className="website-body max-w-[9rem] truncate text-xs font-medium text-white/85 transition-colors duration-300 group-hover:text-white sm:max-w-[11rem] sm:text-sm">
        {partner.name}
      </span>
    </article>
  );
}
