import { CoreServiceCard } from "@/components/website/home/core-service-card";
import { CoreServicesCarousel } from "@/components/website/home/core-services-carousel";
import { AnimateIn } from "@/components/website/animate-in";
import {
  homeLabelClassName,
  homeViewportSectionClassName,
  homeViewportSectionContentClassName,
} from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function CoreServicesSection({ locale }: { locale: SupportedLocale }) {
  const { coreServices } = getHomePageContent(locale);

  return (
    <section
      className={`bg-website-footer ${homeViewportSectionClassName}`}
      aria-labelledby="core-services-title"
    >
      <div className={homeViewportSectionContentClassName}>
        <div className="mx-auto max-w-3xl shrink-0 text-center">
          <span
            className={`${homeLabelClassName(locale)} text-sm text-website-primary sm:text-base`}
          >
            {coreServices.label}
          </span>
          <h2
            id="core-services-title"
            className="website-heading mt-2 text-[1.75rem] font-bold text-white sm:mt-3 sm:text-[2.125rem] lg:text-[2.375rem]"
          >
            {coreServices.title}
          </h2>
          <p className="website-body mx-auto mt-3 max-w-2xl text-sm font-light leading-relaxed text-website-muted sm:text-[0.9375rem]">
            {coreServices.description}
          </p>
        </div>

        <div className="mt-6 sm:mt-7 lg:hidden">
          <CoreServicesCarousel cards={coreServices.cards} locale={locale} />
        </div>

        <div className="mt-6 hidden w-full sm:mt-7 lg:mt-8 lg:block">
          <AnimateIn stagger staggerVariant="scale">
            <ul
              className="grid grid-cols-3 items-center justify-items-center gap-6"
              role="list"
            >
              {coreServices.cards.map((service) => (
                <li key={service.title} className="flex justify-center">
                  <CoreServiceCard service={service} />
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
