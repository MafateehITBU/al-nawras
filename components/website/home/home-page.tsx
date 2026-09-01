import { AnimateIn } from "@/components/website/animate-in";
import { AlNawrasEdgeSection } from "@/components/website/home/al-nawras-edge-section";
import { CoreServicesSection } from "@/components/website/home/core-services-section";
import { ExpertiseSection } from "@/components/website/home/expertise-section";
import { HomeHero } from "@/components/website/home/home-hero";
import { OurApproachSection } from "@/components/website/home/our-approach-section";
import { OurPartnersSection } from "@/components/website/home/our-partners-section";
import { WhoWeAreSection } from "@/components/website/home/who-we-are-section";
import type { SupportedLocale } from "@/lib/i18n/config";

export function HomePage({ locale }: { locale: SupportedLocale }) {
  return (
    <div className="home-page-sections">
      <AnimateIn immediate variant="scale">
        <HomeHero locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <WhoWeAreSection locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <CoreServicesSection locale={locale} />
      </AnimateIn>
      <AnimateIn variant="scale">
        <AlNawrasEdgeSection locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <OurApproachSection locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <OurPartnersSection locale={locale} />
      </AnimateIn>
      <AnimateIn variant="scale">
        <ExpertiseSection locale={locale} />
      </AnimateIn>
    </div>
  );
}
