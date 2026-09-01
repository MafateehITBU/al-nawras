import { AnimateIn } from "@/components/website/animate-in";
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
      <AnimateIn immediate variant="fade">
        <ServiceHero locale={locale} service={service} />
      </AnimateIn>
      <AnimateIn variant="up">
        <ServiceOverview locale={locale} service={service} />
      </AnimateIn>
      <AnimateIn variant="up">
        <StrategicBenefitsSection locale={locale} service={service} />
      </AnimateIn>
      <AnimateIn variant="scale">
        <WhyChooseSection locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <RelatedServicesSection locale={locale} services={relatedServices} />
      </AnimateIn>
    </>
  );
}
