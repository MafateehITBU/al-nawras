import { PartnersMarquee } from "@/components/website/home/partners-marquee";
import { AnimateIn } from "@/components/website/animate-in";
import { homeLabelClassName } from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { listPartners } from "@/lib/services/partner.service";

export async function OurPartnersSection({ locale }: { locale: SupportedLocale }) {
  const { partners } = getHomePageContent(locale);
  const items = await listPartners();

  return (
    <section
      className="relative overflow-hidden bg-website-footer py-14 sm:py-16 lg:py-20"
      aria-labelledby="our-partners-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-website-primary/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />

      <div className="website-container relative w-full">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className={`${homeLabelClassName(locale)} text-sm text-website-primary sm:text-base`}
          >
            {partners.label}
          </span>
          <h2
            id="our-partners-title"
            className="website-heading mt-2 text-[1.75rem] font-bold text-white sm:mt-3 sm:text-[2.125rem] lg:text-[2.375rem]"
          >
            {partners.titleBefore}
            <span className="font-normal italic text-website-primary">
              {partners.titleHighlight}
            </span>
          </h2>
          <p className="website-body mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-website-muted sm:mt-5 sm:text-base">
            {partners.description}
          </p>
        </div>
      </div>

      {items.length > 0 ? (
        <AnimateIn variant="fade" className="relative mt-10 sm:mt-12 lg:mt-14">
          <PartnersMarquee
            partners={items.map((partner) => ({
              id: partner.id,
              name: partner.name,
              logoUrl: partner.logoUrl,
            }))}
          />
        </AnimateIn>
      ) : null}
    </section>
  );
}
