import { CategoryServiceSection } from "@/components/website/service/category-service-section";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPublicServiceCategoryPageData } from "@/lib/services/service.service";

type CategoryPageData = Awaited<ReturnType<typeof getPublicServiceCategoryPageData>>;

export function ServiceCategoryServicesSection({
  locale,
  category,
}: {
  locale: SupportedLocale;
  category: CategoryPageData;
}) {
  const dictionary = getDictionary(locale);
  const services = category.services;

  if (services.length === 0) {
    return (
      <section className="bg-website-surface py-20 sm:py-28">
        <div className="website-container">
          <p className="website-body text-center text-base font-light text-website-hero-description">
            {dictionary.actions.noServicesInCategory}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {services.map((service, index) => (
        <CategoryServiceSection
          key={service.id}
          locale={locale}
          service={service}
          index={index}
          reversed={index % 2 === 1}
        />
      ))}
    </>
  );
}
