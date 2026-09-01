import { ExpertiseCarousel } from "@/components/website/about/expertise-carousel";
import { aboutSectionClassName } from "@/components/website/about/about-section-styles";
import { getAboutPageContent } from "@/lib/i18n/about-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function AboutExpertise({ locale }: { locale: SupportedLocale }) {
  const { expertise } = getAboutPageContent(locale);

  return (
    <section className={aboutSectionClassName} aria-labelledby="about-expertise-title">
      <div className="website-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              className="h-px w-10 bg-website-primary sm:w-14"
              aria-hidden="true"
            />
            <span className="website-body text-xs font-semibold uppercase tracking-[0.2em] text-website-primary [dir=rtl]:normal-case">
              {expertise.label}
            </span>
            <span
              className="h-px w-10 bg-website-primary sm:w-14"
              aria-hidden="true"
            />
          </div>

          <h2
            id="about-expertise-title"
            className="website-heading mt-5 text-2xl font-bold text-website-text sm:text-3xl lg:text-[2rem]"
          >
            {expertise.title}
          </h2>

          <p className="website-body mt-3 text-base font-light text-[#44474C] sm:mt-4 sm:text-lg">
            {expertise.description}
          </p>
        </div>

        <ExpertiseCarousel cards={expertise.cards} locale={locale} />
      </div>
    </section>
  );
}
