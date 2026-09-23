import { PageHeroBackground } from "@/components/website/page-hero-background";
import { ServiceBreadcrumb } from "@/components/website/service/service-breadcrumb";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { Service } from "@prisma/client";

type ServiceHeroData = Pick<
  Service,
  "nameEn" | "nameAr" | "heroTitleEn" | "heroTitleAr" | "heroDescriptionEn" | "heroDescriptionAr"
>;

export function ServiceHero({
  locale,
  service,
}: {
  locale: SupportedLocale;
  service: ServiceHeroData;
}) {
  const serviceName = pickLocalizedField(service, "name", locale);
  const heroTitle = pickLocalizedField(service, "heroTitle", locale);
  const heroDescription = pickLocalizedField(service, "heroDescription", locale);

  return (
    <section
      className="relative overflow-hidden bg-website-text"
      aria-labelledby="service-hero-title"
    >
      <PageHeroBackground src="/images/service-hero-bg.png" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-website-text/92 via-website-text/75 to-website-text/45 rtl:bg-gradient-to-l"
        aria-hidden="true"
      />
      <div className="website-container relative py-20 sm:py-24 lg:py-28">
        <ServiceBreadcrumb locale={locale} serviceName={serviceName} />

        <div className="mt-6 max-w-3xl sm:mt-8">
          <h1
            id="service-hero-name"
            className="website-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {serviceName}
          </h1>

          <div
            className="mt-3 h-1 w-14 rounded-full bg-website-secondary sm:mt-4"
            aria-hidden="true"
          />

          <p
            id="service-hero-title"
            className="website-heading mt-4 text-xl font-semibold text-website-secondary sm:mt-5 sm:text-2xl"
          >
            {heroTitle}
          </p>

          <p className="website-body mt-4 whitespace-pre-line text-base font-light leading-relaxed text-white/95 sm:mt-5 sm:text-lg">
            {heroDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
