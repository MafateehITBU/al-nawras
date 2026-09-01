import { CategoryServiceSection } from "@/components/website/service/category-service-section";
import { serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { AnimateIn } from "@/components/website/animate-in";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
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
  const content = getServicePageContent(locale);
  const dictionary = getDictionary(locale);
  const categoryName = pickLocalizedField(category, "name", locale);
  const services = category.services;

  if (services.length === 0) {
    return (
      <section className={`bg-website-surface ${serviceSectionClassName}`}>
        <div className="website-container">
          <p className="website-body text-center text-base font-light text-website-hero-description">
            {dictionary.actions.noServicesInCategory}
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-website-surface">
      <section
        className="website-container pt-20 sm:pt-28 lg:pt-32"
        aria-labelledby="category-services-title"
      >
        <div className="mx-auto max-w-3xl text-center">
            <span className="website-body text-sm font-semibold uppercase tracking-wide text-website-primary">
              {content.categoryServicesTitle}
            </span>
            <h2
              id="category-services-title"
              className="website-heading mt-2 text-2xl font-bold text-website-text sm:text-3xl"
            >
              {categoryName}
            </h2>
            <p className="website-body mx-auto mt-3 max-w-2xl text-sm font-light leading-relaxed text-website-hero-description sm:text-base">
              {content.categoryServicesDescription}
            </p>
          </div>
      </section>

      {services.map((service, index) => (
        <AnimateIn key={service.id} variant="up">
          <CategoryServiceSection
            locale={locale}
            service={service}
            reversed={index % 2 === 1}
            isFirst={index === 0}
          />
        </AnimateIn>
      ))}
    </div>
  );
}
