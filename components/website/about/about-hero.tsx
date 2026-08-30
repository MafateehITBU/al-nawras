import { PageBreadcrumb } from "@/components/website/page-breadcrumb";
import { getAboutPageContent } from "@/lib/i18n/about-page-content";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";

export function AboutHero({ locale }: { locale: SupportedLocale }) {
  const content = getAboutPageContent(locale);
  const dictionary = getDictionary(locale);
  const { hero } = content;

  return (
    <section
      className="relative overflow-hidden bg-website-text bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/about-hero-bg.png')" }}
      aria-labelledby="about-hero-title"
    >
      <div className="absolute inset-0 bg-website-text/55" aria-hidden="true" />
      <div className="website-container relative py-16 sm:py-20 lg:py-24">
        <PageBreadcrumb locale={locale} currentLabel={dictionary.nav.about} />

        <div className="mt-6 max-w-3xl sm:mt-8">
          <h1
            id="about-hero-title"
            className="website-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]"
          >
            <span className="block text-white">{hero.titleLine1}</span>
            <span className="mt-2 block text-website-secondary sm:mt-3">
              {hero.titleLine2}
            </span>
          </h1>

          <p className="website-body mt-5 text-base font-light leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}
