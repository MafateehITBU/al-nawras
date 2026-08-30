import { AboutExpertise } from "@/components/website/about/about-expertise";
import { AboutHero } from "@/components/website/about/about-hero";
import { FirmExpertise } from "@/components/website/about/firm-expertise";
import type { SupportedLocale } from "@/lib/i18n/config";

export function AboutPage({ locale }: { locale: SupportedLocale }) {
  return (
    <>
      <AboutHero locale={locale} />
      <AboutExpertise locale={locale} />
      <FirmExpertise locale={locale} />
    </>
  );
}
