import { PrimaryButton } from "@/components/website/primary-button";
import { SecondaryButton } from "@/components/website/secondary-button";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import { localizePath } from "@/lib/i18n/config";
import type { SupportedLocale } from "@/lib/i18n/config";

export function HeroButtons({ locale }: { locale: SupportedLocale }) {
  const { hero } = getHomePageContent(locale);
  const contactHref = localizePath("/contact", locale);
  const aboutHref = localizePath("/about", locale);

  return (
    <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
      <PrimaryButton href={contactHref}>{hero.primaryCta}</PrimaryButton>
      <SecondaryButton href={aboutHref}>{hero.secondaryCta}</SecondaryButton>
    </div>
  );
}
