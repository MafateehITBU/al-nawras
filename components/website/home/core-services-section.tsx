import { CoreServicesCarousel } from "@/components/website/home/core-services-carousel";
import { AnimateIn } from "@/components/website/animate-in";
import {
  homeLabelClassName,
  homeViewportSectionClassName,
  homeViewportSectionContentClassName,
} from "@/components/website/home/home-section-styles";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getHomePageContent, type HomeCoreService } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { getPublicServicesMenu } from "@/lib/services/service.service";

export async function CoreServicesSection({ locale }: { locale: SupportedLocale }) {
  const { coreServices } = getHomePageContent(locale);
  const categories = await getPublicServicesMenu();
  const cards: HomeCoreService[] = categories.map((category) => ({
    id: category.id,
    slug: category.slug,
    icon: category.icon,
    title: pickLocalizedField(category, "name", locale),
    description: pickLocalizedField(category, "description", locale),
  }));

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

        {cards.length > 0 ? (
          <div className="mt-6 w-full sm:mt-7 lg:mt-8">
            <AnimateIn variant="scale">
              <CoreServicesCarousel cards={cards} locale={locale} />
            </AnimateIn>
          </div>
        ) : null}
      </div>
    </section>
  );
}
