import { Fragment } from "react";
import { EdgeItem } from "@/components/website/home/edge-item";
import { AnimateIn } from "@/components/website/animate-in";
import {
  homeBodyClassName,
  homeDescriptionSizeClassName,
  homeViewportSectionClassName,
  homeViewportSectionContentClassName,
} from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function AlNawrasEdgeSection({ locale }: { locale: SupportedLocale }) {
  const { alNawrasEdge } = getHomePageContent(locale);

  return (
    <section
      className={`bg-website-surface ${homeViewportSectionClassName}`}
      aria-labelledby="al-nawras-edge-title"
    >
      <div className={homeViewportSectionContentClassName}>
        <div className="max-w-3xl">
          <h2
            id="al-nawras-edge-title"
            className="website-heading text-[1.75rem] font-bold text-website-text sm:text-[2.125rem] lg:text-[2.5rem] xl:text-[2.75rem]"
          >
            {alNawrasEdge.titleBefore}
            <span className="font-normal italic text-website-primary">{alNawrasEdge.titleHighlight}</span>
          </h2>
          <p className={`mt-4 sm:mt-5 ${homeDescriptionSizeClassName} ${homeBodyClassName}`}>
            {alNawrasEdge.description.split("\n").map((line, index, lines) => (
              <Fragment key={index}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        </div>

        <div className="mt-8 bg-website-bg sm:mt-10">
          <AnimateIn stagger staggerVariant="up">
            <ul
              className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8"
              role="list"
            >
              {alNawrasEdge.items.map((item) => (
                <li key={item.number} className="h-full">
                  <EdgeItem item={item} locale={locale} />
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
