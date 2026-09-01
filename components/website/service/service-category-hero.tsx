import { AnimateIn } from "@/components/website/animate-in";
import { IconifyIcon } from "@/components/website/service/iconify-icon";
import { ServiceCategoryBreadcrumb } from "@/components/website/service/service-category-breadcrumb";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getPublicServiceCategoryPageData } from "@/lib/services/service.service";
import Image from "next/image";
import Link from "next/link";

const CATEGORY_HERO_IMAGE = "/images/Test.jpeg";

type CategoryHeroData = Pick<
  Awaited<ReturnType<typeof getPublicServiceCategoryPageData>>,
  | "nameEn"
  | "nameAr"
  | "icon"
  | "descriptionEn"
  | "descriptionAr"
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
  const serviceCount = category.services.length;

  return (
    <section
      className="relative min-h-[22rem] overflow-hidden bg-website-text sm:min-h-[26rem] lg:min-h-[30rem]"
      aria-labelledby="service-category-hero-title"
    >
      <Image
        src={CATEGORY_HERO_IMAGE}
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="category-hero-image object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-website-text/75 via-website-text/50 to-website-text/85"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -inset-e-20 -top-20 size-72 rounded-full bg-website-primary/25 blur-3xl sm:size-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -inset-s-24 size-64 rounded-full bg-website-secondary/20 blur-3xl sm:size-80"
        aria-hidden="true"
      />

      <IconifyIcon
        icon={category.icon}
        className="pointer-events-none absolute inset-e-8 top-1/2 hidden size-48 -translate-y-1/2 opacity-[0.08] text-white lg:block xl:inset-e-16 xl:size-64"
        aria-hidden
      />

      <div className="website-container relative py-20 sm:py-24 lg:py-28">
        <AnimateIn immediate variant="fade">
          <ServiceCategoryBreadcrumb locale={locale} categoryName={categoryName} />
        </AnimateIn>

        <AnimateIn immediate variant="up" delay={80}>
          <div className="mt-8 max-w-3xl sm:mt-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15 backdrop-blur-sm sm:size-[4.5rem]"
                aria-hidden="true"
              >
                <IconifyIcon icon={category.icon} className="size-8 text-website-primary sm:size-9" />
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

                <div className="mt-3 h-1 w-14 rounded-full bg-website-secondary sm:mt-4" aria-hidden="true" />

                {serviceCount > 0 ? (
                  <p className="website-body mt-3 text-sm font-medium text-white/80 sm:mt-4 sm:text-base">
                    {serviceCount}{" "}
                    {locale === "ar"
                      ? serviceCount === 1
                        ? "خدمة متخصصة"
                        : "خدمات متخصصة"
                      : serviceCount === 1
                        ? "specialised service"
                        : "specialised services"}
                  </p>
                ) : null}
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
              className="mt-10 border-t border-white/10 pt-8 sm:mt-12"
              aria-label={content.categoryServicesTitle}
            >
              <p className="website-body mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                {locale === "ar" ? "تصفح الخدمات" : "Browse services"}
              </p>
              <ul className="-mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {category.services.map((service, index) => {
                  const name = pickLocalizedField(service, "name", locale);
                  return (
                    <li key={service.id} className="shrink-0">
                      <Link
                        href={`#category-service-${service.slug}`}
                        className="website-body inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-website-primary/50 hover:bg-white/15 hover:text-white website-focus-ring"
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
