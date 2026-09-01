import { serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { RelatedServiceCard } from "@/components/website/service/related-service-card";
import { AnimateIn } from "@/components/website/animate-in";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { RelatedServiceSummary } from "@/lib/services/service.service";

export function RelatedServicesSection({
  locale,
  services,
}: {
  locale: SupportedLocale;
  services: RelatedServiceSummary[];
}) {
  if (services.length === 0) {
    return null;
  }

  const content = getServicePageContent(locale);

  return (
    <section
      className={`bg-website-surface ${serviceSectionClassName}`}
      aria-labelledby="related-services-title"
    >
      <div className="website-container">
        <h2
          id="related-services-title"
          className="website-heading text-2xl font-bold text-website-text sm:text-3xl"
        >
          {content.relatedServices}
        </h2>

        <AnimateIn stagger staggerVariant="scale">
          <ul
            className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            role="list"
          >
            {services.map((service) => (
              <li key={service.id}>
                <RelatedServiceCard locale={locale} service={service} />
              </li>
            ))}
          </ul>
        </AnimateIn>
      </div>
    </section>
  );
}
