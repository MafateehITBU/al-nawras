"use client";

import { Icon } from "@iconify/react";
import { CoreServiceCard } from "@/components/website/home/core-service-card";
import type { HomeCoreService } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { useEffect, useState } from "react";

const AUTO_ADVANCE_MS = 5000;
const DESKTOP_VISIBLE = 3;

function useDesktopLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function CoreServicesCarousel({
  cards,
  locale,
}: {
  cards: HomeCoreService[];
  locale: SupportedLocale;
}) {
  const isDesktop = useDesktopLayout();
  const visibleCount = isDesktop ? DESKTOP_VISIBLE : 1;
  const maxIndex = Math.max(0, cards.length - visibleCount);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const isRtl = locale === "ar";
  const canSlide = maxIndex > 0;

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !canSlide || paused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [canSlide, maxIndex, paused]);

  const pageCount = maxIndex + 1;
  const direction = isRtl ? 1 : -1;
  const slideOffset = isDesktop
    ? `calc(${direction * activeIndex} * (100% + 1.5rem) / ${DESKTOP_VISIBLE})`
    : `calc(${direction * activeIndex} * (100% + 1.5rem))`;

  function goTo(index: number) {
    setActiveIndex(Math.min(Math.max(index, 0), maxIndex));
  }

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      aria-label="Core services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={
          canSlide
            ? "flex items-center gap-3 sm:gap-4 lg:gap-5"
            : undefined
        }
      >
        {canSlide ? (
          <button
            type="button"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-website-card-dark-border bg-website-card-dark text-white transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring lg:inline-flex"
            aria-label={isRtl ? "السابق" : "Previous"}
            onClick={() => goTo(activeIndex <= 0 ? maxIndex : activeIndex - 1)}
          >
            <Icon
              icon="lucide:chevron-left"
              className="size-5 rtl:rotate-180"
              aria-hidden
            />
          </button>
        ) : null}

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex w-full gap-6 transition-transform duration-500 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(${slideOffset})` }}
            aria-live="polite"
          >
            {cards.map((service) => (
              <div
                key={service.id}
                className="flex min-w-0 shrink-0 grow-0 basis-full justify-center lg:basis-[calc((100%-3rem)/3)]"
                role="group"
                aria-roledescription="slide"
              >
                <div className="w-full min-w-0">
                  <CoreServiceCard service={service} locale={locale} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {canSlide ? (
          <button
            type="button"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-website-card-dark-border bg-website-card-dark text-white transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring lg:inline-flex"
            aria-label={isRtl ? "التالي" : "Next"}
            onClick={() => goTo(activeIndex >= maxIndex ? 0 : activeIndex + 1)}
          >
            <Icon
              icon="lucide:chevron-right"
              className="size-5 rtl:rotate-180"
              aria-hidden
            />
          </button>
        ) : null}
      </div>

      {canSlide ? (
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={cards[index]?.id ?? index}
              type="button"
              aria-label={isRtl ? `الشريحة ${index + 1}` : `Slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 website-focus-ring ${
                index === activeIndex
                  ? "w-6 bg-website-primary"
                  : "w-1.5 bg-website-muted/50 hover:bg-website-muted"
              }`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
