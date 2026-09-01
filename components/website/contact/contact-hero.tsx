import { PageBreadcrumb } from "@/components/website/page-breadcrumb";
import { getContactPageContent } from "@/lib/i18n/contact-page-content";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";

export function ContactHero({ locale }: { locale: SupportedLocale }) {
  const content = getContactPageContent(locale);
  const dictionary = getDictionary(locale);

  return (
    <section
      className="relative overflow-hidden bg-website-text bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/about-hero-bg.png')" }}
      aria-labelledby="contact-hero-title"
    >
      <div className="absolute inset-0 bg-website-text/55" aria-hidden="true" />

      <div className="website-container relative py-14 sm:py-20 lg:py-24">
        <PageBreadcrumb locale={locale} currentLabel={dictionary.nav.contact} />

        <div className="mt-6 max-w-3xl sm:mt-8">
          <h1
            id="contact-hero-title"
            className="website-heading text-3xl font-bold leading-tight text-website-secondary sm:text-4xl lg:text-[2.75rem]"
          >
            {content.hero.title}
          </h1>

          <p className="website-body mt-5 max-w-2xl text-base font-light leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
            {content.hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}
