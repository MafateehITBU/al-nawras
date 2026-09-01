"use client";

import { PartnerLogoSlot } from "@/components/website/home/partner-logo-slot";
import type { HomePartner } from "@/lib/i18n/home-page-content";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type MarqueePartner = Pick<HomePartner, "id" | "name" | "logoUrl" | "websiteUrl">;

export function PartnersMarquee({
  partners,
  placeholderLabel,
  isPlaceholder,
}: {
  partners: MarqueePartner[];
  placeholderLabel: string;
  isPlaceholder: boolean;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const trackItems = useMemo(
    () => (reduceMotion ? partners : [...partners, ...partners]),
    [partners, reduceMotion],
  );

  return (
    <div
      className={cn(
        "partners-marquee relative border-y border-website-border bg-website-bg py-6 sm:py-7",
        reduceMotion ? "overflow-x-auto" : "overflow-hidden",
      )}
      aria-label="Partner logos"
    >
      {!reduceMotion ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-r from-website-bg to-transparent sm:w-16 lg:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-website-bg to-transparent sm:w-16 lg:w-24"
            aria-hidden
          />
        </>
      ) : null}

      <ul
        className={cn(
          "partners-marquee__track flex w-max items-center gap-5 px-5 sm:gap-7 sm:px-8",
          !reduceMotion && "partners-marquee__track--animate",
          reduceMotion && "mx-auto w-full max-w-6xl flex-wrap justify-center gap-4",
        )}
        role="list"
      >
        {trackItems.map((partner, index) => (
          <li key={`${partner.id}-${index}`} className="shrink-0">
            <PartnerLogoSlot
              partner={partner}
              placeholderLabel={placeholderLabel}
              isPlaceholder={isPlaceholder}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
