import { RelatedServicesSection } from "@/components/website/service/related-services-section";
import { ServiceHero } from "@/components/website/service/service-hero";
import { ServiceOverview } from "@/components/website/service/service-overview";
import { StrategicBenefitsSection } from "@/components/website/service/strategic-benefits-section";
import { WhyChooseSection } from "@/components/website/service/why-choose-section";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPublicServicePageData } from "@/lib/services/service.service";

type ServicePageData = Awaited<ReturnType<typeof getPublicServicePageData>>;

export function ServiceDetailsPage({
  locale,
  data,
}: {
  locale: SupportedLocale;
  data: ServicePageData;
}) {
  const { service, relatedServices } = data;

  return (
    <>
      <ServiceHero locale={locale} service={service} />
      <ServiceOverview locale={locale} service={service} />
      <StrategicBenefitsSection locale={locale} service={service} />
      <WhyChooseSection locale={locale} />
      <RelatedServicesSection locale={locale} services={relatedServices} />
    </>
  );
}
