import { PartnersMarquee } from "@/components/website/home/partners-marquee";
import { AnimateIn } from "@/components/website/animate-in";
import {
  homeBodyClassName,
  homeDescriptionSizeClassName,
  homeLabelClassName,
} from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

const PARTNER_PLACEHOLDER_COUNT = 10;

export function OurPartnersSection({ locale }: { locale: SupportedLocale }) {
  const { partners } = getHomePageContent(locale);

  const slots =
    partners.items.length > 0
      ? partners.items
      : Array.from({ length: PARTNER_PLACEHOLDER_COUNT }, (_, index) => ({
          id: `partner-placeholder-${index + 1}`,
          name: partners.placeholderLabel,
          logoUrl: null,
        }));

  return (
    <section
      className="overflow-hidden bg-website-surface py-12 sm:py-14 lg:py-16"
      aria-labelledby="our-partners-title"
    >
      <div className="website-container w-full">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className={`${homeLabelClassName(locale)} text-sm text-website-primary sm:text-base`}
          >
            {partners.label}
          </span>
          <h2
            id="our-partners-title"
            className="website-heading mt-2 text-[1.75rem] font-bold text-website-text sm:mt-3 sm:text-[2.125rem] lg:text-[2.375rem]"
          >
            {partners.titleBefore}
            <span className="font-normal italic text-website-primary">
              {partners.titleHighlight}
            </span>
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl sm:mt-5 ${homeDescriptionSizeClassName} ${homeBodyClassName}`}
          >
            {partners.description}
          </p>
        </div>
      </div>

      <AnimateIn variant="fade" className="mt-8 sm:mt-10 lg:mt-12">
        <PartnersMarquee
          partners={slots}
          placeholderLabel={partners.placeholderLabel}
          isPlaceholder={partners.items.length === 0}
        />
      </AnimateIn>
    </section>
  );
}
