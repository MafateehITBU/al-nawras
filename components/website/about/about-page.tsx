import { AboutExpertise } from "@/components/website/about/about-expertise";
import { AboutHero } from "@/components/website/about/about-hero";
import { FirmExpertise } from "@/components/website/about/firm-expertise";
import { AnimateIn } from "@/components/website/animate-in";
import type { SupportedLocale } from "@/lib/i18n/config";

export function AboutPage({ locale }: { locale: SupportedLocale }) {
  return (
    <>
      <AnimateIn immediate variant="fade">
        <AboutHero locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <AboutExpertise locale={locale} />
      </AnimateIn>
      <AnimateIn variant="up">
        <FirmExpertise locale={locale} />
      </AnimateIn>
    </>
  );
}
