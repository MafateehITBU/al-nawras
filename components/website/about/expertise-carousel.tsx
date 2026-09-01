"use client";

import { Icon } from "@iconify/react";
import { ExpertiseCard } from "@/components/website/about/expertise-card";
import type { AboutExpertiseCard } from "@/lib/i18n/about-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const GAP_PX = 24;
const DESKTOP_VISIBLE = 3;
const CARD_MAX_WIDTH = 421;
const AUTO_ADVANCE_MS = 5000;
const LOOP_COPIES = 3;

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(DESKTOP_VISIBLE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setVisibleCount(mediaQuery.matches ? DESKTOP_VISIBLE : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return visibleCount;
}

type LoopedCard = AboutExpertiseCard & { loopKey: string; logicalIndex: number };

function buildLoopedCards(cards: AboutExpertiseCard[]): LoopedCard[] {
  return Array.from({ length: LOOP_COPIES }, (_, copy) =>
    cards.map((card, index) => ({
      ...card,
      logicalIndex: index,
      loopKey: `${copy}-${index}-${card.title}`,
    })),
  ).flat();
}

export function ExpertiseCarousel({
  cards,
  locale,
}: {
  cards: AboutExpertiseCard[];
  locale: SupportedLocale;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopedCards = useMemo(() => buildLoopedCards(cards), [cards]);
  const [virtualIndex, setVirtualIndex] = useState(cards.length);
  const [offsetPx, setOffsetPx] = useState(0);
  const [cardWidthPx, setCardWidthPx] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const visibleCount = useVisibleCount();
  const isRtl = locale === "ar";
  const canSlide = cards.length > 1;
  const isDesktop = visibleCount === DESKTOP_VISIBLE;
  const activeSlideIndex = virtualIndex + (isDesktop ? 1 : 0);
  const logicalActiveIndex =
    cards.length > 0 ? ((activeSlideIndex % cards.length) + cards.length) % cards.length : 0;

  const updateLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const width = isDesktop
      ? (containerWidth - GAP_PX * (DESKTOP_VISIBLE - 1)) / DESKTOP_VISIBLE
      : Math.min(CARD_MAX_WIDTH, containerWidth);

    setCardWidthPx(width);

    const cardStep = width + GAP_PX;
    const trackOffset = isDesktop
      ? -virtualIndex * cardStep
      : containerWidth / 2 - width / 2 - virtualIndex * cardStep;

    setOffsetPx(isRtl ? -trackOffset : trackOffset);
  }, [isDesktop, isRtl, virtualIndex]);

  useEffect(() => {
    updateLayout();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(container);
    window.addEventListener("resize", updateLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout]);

  useEffect(() => {
    setVirtualIndex(cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (!canSlide) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const intervalId = window.setInterval(() => {
      setVirtualIndex((current) => current + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [canSlide]);

  const normalizeVirtualIndex = useCallback((current: number) => {
    if (cards.length === 0) return current;

    if (current >= cards.length * 2) {
      setSkipTransition(true);
      return current - cards.length;
    }

    if (current < cards.length) {
      setSkipTransition(true);
      return current + cards.length;
    }

    return current;
  }, [cards.length]);

  useEffect(() => {
    if (!skipTransition) return;

    const frameId = requestAnimationFrame(() => setSkipTransition(false));
    return () => cancelAnimationFrame(frameId);
  }, [skipTransition]);

  function goToLogical(logicalIndex: number) {
    if (cards.length === 0) return;
    const normalized = ((logicalIndex % cards.length) + cards.length) % cards.length;
    const leadOffset = isDesktop ? 1 : 0;
    setVirtualIndex(cards.length + normalized - leadOffset);
  }

  function goNext() {
    setVirtualIndex((current) => current + 1);
  }

  function goPrev() {
    setVirtualIndex((current) => current - 1);
  }

  return (
    <div
      className="relative mt-10 sm:mt-12"
      aria-roledescription="carousel"
      aria-label={isRtl ? "خدمات الملكية الفكرية" : "Intellectual property services"}
    >
      <div className={cn("flex items-center", canSlide && "gap-3 sm:gap-4")}>
        {canSlide ? (
          <button
            type="button"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-website-border bg-website-surface text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring lg:inline-flex"
            aria-label={isRtl ? "السابق" : "Previous"}
            onClick={goPrev}
          >
            <Icon icon="lucide:chevron-left" className="size-5 rtl:rotate-180" aria-hidden />
          </button>
        ) : null}

        <div ref={containerRef} className="min-w-0 flex-1 overflow-hidden py-6">
          <div
            ref={trackRef}
            className={cn(
              "flex gap-6",
              !skipTransition &&
                "transition-transform duration-500 ease-in-out motion-reduce:transition-none",
            )}
            style={{ transform: `translateX(${offsetPx}px)` }}
            onTransitionEnd={(event) => {
              if (event.propertyName !== "transform") return;
              setVirtualIndex((current) => normalizeVirtualIndex(current));
            }}
            aria-live="polite"
          >
            {loopedCards.map((card, index) => {
              const isActive = index === activeSlideIndex;

              return (
                <div
                  key={card.loopKey}
                  className={cn(
                    "shrink-0 origin-center transition-all duration-500 ease-in-out motion-reduce:transition-none",
                    isActive ? "z-10 scale-105" : "scale-[0.92] opacity-80",
                  )}
                  style={{ width: cardWidthPx > 0 ? cardWidthPx : undefined }}
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={!isActive}
                  aria-label={`${card.logicalIndex + 1} / ${cards.length}`}
                >
                  <ExpertiseCard card={card} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        {canSlide ? (
          <button
            type="button"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-website-border bg-website-surface text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring lg:inline-flex"
            aria-label={isRtl ? "التالي" : "Next"}
            onClick={goNext}
          >
            <Icon icon="lucide:chevron-right" className="size-5 rtl:rotate-180" aria-hidden />
          </button>
        ) : null}
      </div>

      {canSlide ? (
        <>
          <div className="mt-2 flex justify-center gap-3 lg:hidden">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-website-border bg-website-surface text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring"
              aria-label={isRtl ? "السابق" : "Previous"}
              onClick={goPrev}
            >
              <Icon icon="lucide:chevron-left" className="size-5 rtl:rotate-180" aria-hidden />
            </button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-website-border bg-website-surface text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring"
              aria-label={isRtl ? "التالي" : "Next"}
              onClick={goNext}
            >
              <Icon icon="lucide:chevron-right" className="size-5 rtl:rotate-180" aria-hidden />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {cards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                aria-label={isRtl ? `البطاقة ${index + 1}` : `Card ${index + 1}`}
                aria-current={index === logicalActiveIndex ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 website-focus-ring",
                  index === logicalActiveIndex
                    ? "w-6 bg-website-primary"
                    : "w-1.5 bg-website-muted/50 hover:bg-website-muted",
                )}
                onClick={() => goToLogical(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
