import { AnimateIn } from "@/components/website/animate-in";
import { IconifyIcon } from "@/components/website/service/iconify-icon";
import { ServiceCategoryBreadcrumb } from "@/components/website/service/service-category-breadcrumb";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPublicServiceCategoryPageData } from "@/lib/services/service.service";
import Image from "next/image";
import Link from "next/link";

const CATEGORY_HERO_FALLBACK_IMAGE = "/images/Test.jpeg";

type CategoryHeroData = Pick<
  Awaited<ReturnType<typeof getPublicServiceCategoryPageData>>,
  | "nameEn"
  | "nameAr"
  | "icon"
  | "descriptionEn"
  | "descriptionAr"
  | "imageUrl"
  | "services"
  | "slug"
>;

export function ServiceCategoryHero({
  locale,
  category,
}: {
  locale: SupportedLocale;
  category: CategoryHeroData;
}) {
  const content = getServicePageContent(locale);
  const categoryName = pickLocalizedField(category, "name", locale);
  const description = pickLocalizedField(category, "description", locale);
  const heroImage = category.imageUrl.trim() || CATEGORY_HERO_FALLBACK_IMAGE;

  return (
    <section
      className="relative flex h-dvh flex-col justify-center overflow-hidden bg-website-text"
      aria-labelledby="service-category-hero-title"
    >
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="category-hero-image object-cover object-center"
      />

      {/* Flat dark layer so text stays readable; background still shows through */}
      <div
        className="absolute inset-0 bg-website-text/70"
        aria-hidden="true"
      />

      <div className="website-container relative w-full py-16 sm:py-20 lg:py-24">
        <AnimateIn immediate variant="fade">
          <ServiceCategoryBreadcrumb locale={locale} categoryName={categoryName} />
        </AnimateIn>

        <AnimateIn immediate variant="up" delay={80}>
          <div className="mt-8 max-w-3xl sm:mt-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-website-primary/20 sm:size-16"
                aria-hidden="true"
              >
                <IconifyIcon
                  icon={category.icon}
                  className="size-7 text-website-primary sm:size-8"
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="website-body text-xs font-semibold uppercase tracking-[0.2em] text-website-primary sm:text-sm">
                  {content.categoryServicesTitle}
                </span>

                <h1
                  id="service-category-hero-title"
                  className="website-heading mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
                >
                  {categoryName}
                </h1>

                <div
                  className="mt-3 h-1 w-14 rounded-full bg-website-secondary sm:mt-4"
                  aria-hidden="true"
                />
              </div>
            </div>

            <p className="website-body mt-6 whitespace-pre-line text-base font-light leading-relaxed text-white/90 sm:mt-8 sm:text-lg">
              {description}
            </p>
          </div>
        </AnimateIn>

        {category.services.length > 0 ? (
          <AnimateIn immediate variant="up" delay={180}>
            <nav
              className="mt-10 border-t border-white/15 pt-8 sm:mt-12"
              aria-label={content.categoryServicesTitle}
            >
              <p className="website-body mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                {locale === "ar" ? "تصفح الخدمات" : "Browse services"}
              </p>
              <ul className="flex flex-wrap gap-2" role="list">
                {category.services.map((service, index) => {
                  const name = pickLocalizedField(service, "name", locale);
                  return (
                    <li key={service.id}>
                      <Link
                        href={`#category-service-${service.slug}`}
                        className="website-body inline-flex items-center gap-2 rounded-full border border-white/25 bg-website-text/40 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:border-website-primary hover:bg-website-text/55 website-focus-ring"
                      >
                        <span className="text-xs font-semibold text-website-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </AnimateIn>
        ) : null}
      </div>
    </section>
  );
}
