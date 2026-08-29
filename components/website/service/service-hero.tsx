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
      className="relative overflow-hidden bg-website-text bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/service-hero-bg.png')" }}
      aria-labelledby="service-hero-title"
    >
      <div className="absolute inset-0 bg-website-text/55" aria-hidden="true" />
      <div className="website-container relative py-20 sm:py-24 lg:py-28">
        <ServiceBreadcrumb locale={locale} serviceName={serviceName} />

        <div className="mt-6 max-w-3xl sm:mt-8">
          <h1
            id="service-hero-name"
            className="website-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {serviceName}
          </h1>

          <p
            id="service-hero-title"
            className="website-heading mt-3 text-xl font-semibold text-website-secondary sm:mt-4 sm:text-2xl"
          >
            {heroTitle}
          </p>

          <p className="website-body mt-4 whitespace-pre-line text-base font-light leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
            {heroDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
