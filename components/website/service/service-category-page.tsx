import { AnimateIn } from "@/components/website/animate-in";
import { ServiceCategoryCta } from "@/components/website/service/service-category-cta";
import { ServiceCategoryHero } from "@/components/website/service/service-category-hero";
import { ServiceCategoryServicesSection } from "@/components/website/service/service-category-services-section";
import { WhyChooseSection } from "@/components/website/service/why-choose-section";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPublicServiceCategoryPageData } from "@/lib/services/service.service";

type CategoryPageData = Awaited<ReturnType<typeof getPublicServiceCategoryPageData>>;

export function ServiceCategoryPage({
  locale,
  category,
}: {
  locale: SupportedLocale;
  category: CategoryPageData;
}) {
  return (
    <>
      <ServiceCategoryHero locale={locale} category={category} />
      <ServiceCategoryServicesSection locale={locale} category={category} />
      {category.services.length > 0 ? (
        <>
          <AnimateIn variant="scale">
            <WhyChooseSection locale={locale} />
          </AnimateIn>
          <AnimateIn variant="up">
            <ServiceCategoryCta locale={locale} />
          </AnimateIn>
        </>
      ) : null}
    </>
  );
}
