import { SquareImageFrame } from "@/components/website/service/square-image-frame";
import { serviceDescriptionClassName, serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { CategoryServiceSummary } from "@/lib/services/service.service";
import { getServiceDetailPath } from "@/lib/website/paths";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CategoryServiceSection({
  locale,
  service,
  reversed = false,
  isFirst = false,
}: {
  locale: SupportedLocale;
  service: CategoryServiceSummary;
  reversed?: boolean;
  isFirst?: boolean;
}) {
  const content = getServicePageContent(locale);
  const name = pickLocalizedField(service, "name", locale);
  const heroTitle = pickLocalizedField(service, "heroTitle", locale);
  const heroDescription = pickLocalizedField(service, "heroDescription", locale);
  const href = getServiceDetailPath(service.slug, locale);
  const sectionId = `category-service-${service.slug}`;

  return (
    <section
      className={cn(
        serviceSectionClassName,
        isFirst && "pt-10 sm:pt-12 lg:pt-14",
        !isFirst && "border-t border-website-border/50",
      )}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="website-container">
        <div
          className={cn(
            "grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16",
            reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
          )}
        >
          <SquareImageFrame
            src={service.overviewImageUrl}
            alt={name}
            frameColor="#3CB0FF1A"
          />

          <div className="min-w-0">
            <h2
              id={`${sectionId}-title`}
              className="website-heading text-2xl font-bold text-website-text sm:text-3xl lg:text-[2rem]"
            >
              {name}
            </h2>

            <p className="website-heading mt-3 text-lg font-semibold text-website-secondary sm:mt-4 sm:text-xl">
              {heroTitle}
            </p>

            <p
              className={`mt-5 border-s-4 border-website-primary/30 ps-4 text-base sm:mt-6 sm:text-[1.0625rem] ${serviceDescriptionClassName}`}
            >
              {heroDescription}
            </p>

            <Link
              href={href}
              className="website-body mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-website-primary transition-colors hover:text-website-primary-hover website-focus-ring sm:mt-8 sm:text-base"
            >
              {content.viewService}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
