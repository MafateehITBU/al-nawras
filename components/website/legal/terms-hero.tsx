import { PageBreadcrumb } from "@/components/website/page-breadcrumb";
import { getTermsPageContent } from "@/lib/i18n/terms-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function TermsHero({ locale }: { locale: SupportedLocale }) {
  const content = getTermsPageContent(locale);

  return (
    <section
      className="relative overflow-hidden bg-website-text bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/about-hero-bg.png')" }}
      aria-labelledby="terms-hero-title"
    >
      <div className="absolute inset-0 bg-website-text/55" aria-hidden="true" />

      <div className="website-container relative py-14 sm:py-20 lg:py-24">
        <PageBreadcrumb locale={locale} currentLabel={content.title} />

        <div className="mt-6 max-w-3xl sm:mt-8">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
            {content.lastUpdated}
          </span>

          <h1
            id="terms-hero-title"
            className="website-heading mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {content.title}
          </h1>

          <p className="website-body mt-3 text-base font-medium text-website-secondary sm:mt-4 sm:text-lg">
            {content.companyLine}
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-website-secondary" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
