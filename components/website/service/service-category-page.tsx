import { AnimateIn } from "@/components/website/animate-in";
import { ServiceCategoryHero } from "@/components/website/service/service-category-hero";
import { ServiceCategoryServicesSection } from "@/components/website/service/service-category-services-section";
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
      <AnimateIn immediate variant="fade">
        <ServiceCategoryHero locale={locale} category={category} />
      </AnimateIn>
      <ServiceCategoryServicesSection locale={locale} category={category} />
    </>
  );
}
