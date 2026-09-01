import { IconifyIcon } from "@/components/website/service/iconify-icon";
import { ServiceCategoryBreadcrumb } from "@/components/website/service/service-category-breadcrumb";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPublicServiceCategoryPageData } from "@/lib/services/service.service";

type CategoryHeroData = Pick<
  Awaited<ReturnType<typeof getPublicServiceCategoryPageData>>,
  "nameEn" | "nameAr" | "icon" | "descriptionEn" | "descriptionAr" | "services"
>;

export function ServiceCategoryHero({
  locale,
  category,
}: {
  locale: SupportedLocale;
  category: CategoryHeroData;
}) {
  const categoryName = pickLocalizedField(category, "name", locale);
  const description = pickLocalizedField(category, "description", locale);
  const serviceCount = category.services.length;

  return (
    <section
      className="relative overflow-hidden bg-website-text bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/service-hero-bg.png')" }}
      aria-labelledby="service-category-hero-title"
    >
      <div className="absolute inset-0 bg-website-text/55" aria-hidden="true" />
      <div className="website-container relative py-20 sm:py-24 lg:py-28">
        <ServiceCategoryBreadcrumb locale={locale} categoryName={categoryName} />

        <div className="mt-6 max-w-3xl sm:mt-8">
          <div className="flex items-start gap-4 sm:gap-5">
            <div
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-website-primary/15 ring-1 ring-white/10 sm:size-16"
              aria-hidden="true"
            >
              <IconifyIcon icon={category.icon} className="size-7 text-website-primary sm:size-8" />
            </div>

            <div className="min-w-0 flex-1">
              <h1
                id="service-category-hero-title"
                className="website-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
              >
                {categoryName}
              </h1>

              {serviceCount > 0 ? (
                <p className="website-body mt-2 text-sm font-medium text-website-secondary sm:text-base">
                  {serviceCount}{" "}
                  {locale === "ar"
                    ? serviceCount === 1
                      ? "خدمة"
                      : "خدمات"
                    : serviceCount === 1
                      ? "Service"
                      : "Services"}
                </p>
              ) : null}
            </div>
          </div>

          <p className="website-body mt-5 whitespace-pre-line text-base font-light leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
