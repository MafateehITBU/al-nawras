import { AnimateIn } from "@/components/website/animate-in";
import { PrimaryButton } from "@/components/website/primary-button";
import { getCategoryServiceSectionBackground } from "@/components/website/service/category-service-section-styles";
import { serviceDescriptionClassName, serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { CategoryServiceSummary } from "@/lib/services/service.service";
import { getServiceDetailPath } from "@/lib/website/paths";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CATEGORY_SECTION_IMAGE = "/images/Test.jpeg";

export function CategoryServiceSection({
  locale,
  service,
  index,
  reversed = false,
}: {
  locale: SupportedLocale;
  service: CategoryServiceSummary;
  index: number;
  reversed?: boolean;
}) {
  const content = getServicePageContent(locale);
  const name = pickLocalizedField(service, "name", locale);
  const heroTitle = pickLocalizedField(service, "heroTitle", locale);
  const heroDescription = pickLocalizedField(service, "heroDescription", locale);
  const href = getServiceDetailPath(service.slug, locale);
  const sectionId = `category-service-${service.slug}`;
  const serviceNumber = String(index + 1).padStart(2, "0");
  const imageSrc = service.overviewImageUrl.trim() || CATEGORY_SECTION_IMAGE;
  const sectionBackground = getCategoryServiceSectionBackground(index);

  return (
    <section
      id={sectionId}
      className={cn(
        "relative scroll-mt-24 overflow-hidden transition-colors duration-500",
        sectionBackground,
        serviceSectionClassName,
      )}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="website-container relative z-10">
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20",
            reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
          )}
        >
          <AnimateIn variant={reversed ? "right" : "left"} delay={index * 40}>
            <div className="group relative mx-auto w-full max-w-xl lg:max-w-none">
              <div
                className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-website-primary/15 via-transparent to-website-secondary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:-inset-4"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-website-bg shadow-[0_28px_56px_-16px_rgba(27,28,28,0.18)] ring-1 ring-website-border/70">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-website-text/25 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="up" delay={120 + index * 40}>
            <div className="relative min-w-0 ps-1 lg:ps-0">
              <p
                className="website-heading text-[3.25rem] font-bold leading-none text-website-primary/20 sm:text-[4rem] lg:text-[4.5rem]"
                aria-hidden="true"
              >
                {serviceNumber}
              </p>

              <h2
                id={`${sectionId}-title`}
                className="website-heading mt-3 text-2xl font-bold text-website-text sm:mt-4 sm:text-3xl lg:text-[2.125rem]"
              >
                {name}
              </h2>

              <p className="website-heading mt-3 text-lg font-semibold leading-snug text-website-secondary sm:mt-4 sm:text-xl">
                {heroTitle}
              </p>

              <div
                className="mt-5 h-1 w-12 origin-start rounded-full bg-website-secondary transition-transform duration-500 ease-out lg:scale-x-100"
                aria-hidden="true"
              />

              <p
                className={`mt-5 text-base leading-relaxed sm:mt-6 sm:text-[1.0625rem] ${serviceDescriptionClassName}`}
              >
                {heroDescription}
              </p>

              <PrimaryButton
                href={href}
                className="mt-8 transition-transform duration-300 hover:-translate-y-0.5 sm:mt-10"
              >
                {content.viewService}
                <ArrowRight className="size-4 shrink-0 rtl:rotate-180" aria-hidden />
              </PrimaryButton>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
