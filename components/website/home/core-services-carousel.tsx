"use client";

import { CoreServiceCard } from "@/components/website/home/core-service-card";
import type { HomeCoreService } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { useEffect, useState } from "react";

const AUTO_ADVANCE_MS = 5000;

export function CoreServicesCarousel({
  cards,
  locale,
}: {
  cards: HomeCoreService[];
  locale: SupportedLocale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || cards.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [cards.length]);

  const slideOffset = locale === "ar" ? activeIndex * 100 : activeIndex * -100;

  return (
    <div
      className="overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Core services"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(${slideOffset}%)` }}
        aria-live="polite"
      >
        {cards.map((service) => (
          <div
            key={service.title}
            className="flex w-full shrink-0 justify-center px-2"
            role="group"
            aria-roledescription="slide"
          >
            <CoreServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
        {cards.map((service, index) => (
          <span
            key={service.title}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-website-primary"
                : "w-1.5 bg-website-muted/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
