import { AlNawrasEdgeSection } from "@/components/website/home/al-nawras-edge-section";
import { CoreServicesSection } from "@/components/website/home/core-services-section";
import { ExpertiseSection } from "@/components/website/home/expertise-section";
import { HomeHero } from "@/components/website/home/home-hero";
import { OurApproachSection } from "@/components/website/home/our-approach-section";
import { WhoWeAreSection } from "@/components/website/home/who-we-are-section";
import type { SupportedLocale } from "@/lib/i18n/config";

export function HomePage({ locale }: { locale: SupportedLocale }) {
  return (
    <div className="home-page-sections">
      <HomeHero locale={locale} />
      <WhoWeAreSection locale={locale} />
      <CoreServicesSection locale={locale} />
      <AlNawrasEdgeSection locale={locale} />
      <OurApproachSection locale={locale} />
      <ExpertiseSection locale={locale} />
    </div>
  );
}
