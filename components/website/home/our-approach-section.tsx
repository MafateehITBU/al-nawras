import { ApproachStep, ApproachStepMobile, APPROACH_LINE_COLOR } from "@/components/website/home/approach-step";
import { homeLabelClassName } from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function OurApproachSection({ locale }: { locale: SupportedLocale }) {
  const { approach } = getHomePageContent(locale);

  return (
    <section
      className="flex flex-col justify-center bg-website-bg py-10 sm:py-12 lg:min-h-[calc(100dvh-5rem)] lg:py-14"
      aria-labelledby="our-approach-title"
    >
      <div className="website-container w-full">
        <div className="mx-auto max-w-3xl text-center">
          <span className={`${homeLabelClassName(locale)} text-sm text-website-primary sm:text-base`}>
            {approach.label}
          </span>
          <h2
            id="our-approach-title"
            className="website-heading mt-2 text-[1.75rem] font-bold text-website-text sm:mt-3 sm:text-[2.125rem] lg:text-[2.375rem]"
          >
            {approach.title}
          </h2>
          <p className="website-body mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-website-hero-description sm:mt-5 sm:text-base">
            {approach.description}
          </p>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="mt-10 lg:hidden">
          {approach.steps.map((step) => (
            <ApproachStepMobile key={step.number} step={step} locale={locale} />
          ))}
        </div>

        {/* Desktop alternating timeline */}
        <div className="relative mt-10 hidden lg:mt-12 lg:block">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{ backgroundColor: APPROACH_LINE_COLOR }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-4 items-stretch gap-6 xl:gap-8">
            {approach.steps.map((step) => (
              <ApproachStep key={step.number} step={step} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
