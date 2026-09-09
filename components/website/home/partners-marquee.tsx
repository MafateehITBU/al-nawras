"use client";

import { PartnerLogoSlot } from "@/components/website/home/partner-logo-slot";
import type { HomePartner } from "@/lib/i18n/home-page-content";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

function MarqueeRow({
  partners,
  reverse = false,
  reduceMotion,
}: {
  partners: HomePartner[];
  reverse?: boolean;
  reduceMotion: boolean;
}) {
  const trackItems = useMemo(
    () => (reduceMotion ? partners : [...partners, ...partners]),
    [partners, reduceMotion],
  );

  return (
    <div
      className={cn(
        "partners-marquee relative",
        reduceMotion ? "overflow-x-auto" : "overflow-hidden",
      )}
    >
      {!reduceMotion ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 start-0 z-10 w-10 bg-gradient-to-r from-website-footer to-transparent sm:w-16 lg:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-website-footer to-transparent sm:w-16 lg:w-24"
            aria-hidden
          />
        </>
      ) : null}

      <ul
        className={cn(
          "partners-marquee__track flex w-max items-center gap-3 px-4 sm:gap-4 sm:px-6",
          !reduceMotion &&
            (reverse
              ? "partners-marquee__track--animate-reverse"
              : "partners-marquee__track--animate"),
          reduceMotion && "mx-auto w-full max-w-6xl flex-wrap justify-center",
        )}
        role="list"
      >
        {trackItems.map((partner, index) => (
          <li key={`${partner.id}-${reverse ? "b" : "a"}-${index}`} className="shrink-0">
            <PartnerLogoSlot partner={partner} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PartnersMarquee({ partners }: { partners: HomePartner[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (partners.length === 0) return null;

  const midpoint = Math.ceil(partners.length / 2);
  const firstRow = partners.slice(0, midpoint);
  const secondRow = partners.slice(midpoint);

  return (
    <div className="space-y-3 sm:space-y-4" aria-label="Partner logos">
      <MarqueeRow partners={firstRow.length > 0 ? firstRow : partners} reduceMotion={reduceMotion} />
      {secondRow.length > 0 ? (
        <MarqueeRow partners={secondRow} reverse reduceMotion={reduceMotion} />
      ) : null}
    </div>
  );
}
