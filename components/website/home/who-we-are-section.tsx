import { CoreValues } from "@/components/website/home/core-values";
import {
  homeLabelClassName,
  homeTextClassName,
  homeViewportSectionClassName,
  homeViewportSectionContentClassName,
} from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function WhoWeAreSection({ locale }: { locale: SupportedLocale }) {
  const { whoWeAre } = getHomePageContent(locale);

  return (
    <section
      className={`bg-website-surface ${homeViewportSectionClassName}`}
      aria-labelledby="who-we-are-title"
    >
      <div className={homeViewportSectionContentClassName}>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-12 xl:gap-16">
          <div>
            <span
              className={`${homeLabelClassName(locale)} text-sm text-website-secondary`}
            >
              {whoWeAre.label}
            </span>

            <h2
              id="who-we-are-title"
              className="website-heading mt-3 text-2xl font-bold leading-tight text-website-text sm:text-[2.375rem] lg:text-[2.5rem] xl:text-[2.75rem]"
            >
              {whoWeAre.titleBefore}{" "}
              <span className="text-website-secondary">{whoWeAre.titleHighlight}</span>
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <article>
                <h3 className="website-heading text-xl font-semibold text-website-secondary sm:text-2xl">
                  {whoWeAre.history.title}
                </h3>
                <p className={`mt-3 text-base sm:text-[1.0625rem] ${homeTextClassName}`}>
                  {whoWeAre.history.description}
                </p>
              </article>
              <article>
                <h3 className="website-heading text-xl font-semibold text-website-secondary sm:text-2xl">
                  {whoWeAre.mission.title}
                </h3>
                <p className={`mt-3 text-base sm:text-[1.0625rem] ${homeTextClassName}`}>
                  {whoWeAre.mission.description}
                </p>
              </article>
            </div>
          </div>

          <CoreValues title={whoWeAre.coreValuesTitle} values={whoWeAre.coreValues} />
        </div>
      </div>
    </section>
  );
}
