import { HeroButtons } from "@/components/website/home/hero-buttons";
import { HeroStats } from "@/components/website/home/hero-stats";
import { homeBodyClassName, homeDescriptionSizeClassName } from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import Image from "next/image";

export function HomeHero({ locale }: { locale: SupportedLocale }) {
  const { hero } = getHomePageContent(locale);

  return (
    <section
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col bg-website-surface lg:h-[calc(100dvh-5rem)] lg:overflow-hidden"
      aria-labelledby="home-hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/home-hero-bg.png')" }}
        aria-hidden="true"
      />

      <div className="relative grid flex-1 lg:grid-cols-[minmax(0,1fr)_50vw] xl:grid-cols-[minmax(0,1fr)_min(50vw,780px)]">
        <div className="website-container relative z-20 flex flex-col justify-center overflow-visible py-10 sm:py-12 lg:py-14">
          <h1
            id="home-hero-title"
            className="website-heading max-w-2xl text-[1.65rem] font-bold leading-[1.15] sm:text-3xl lg:max-w-none lg:text-[2.65rem] xl:text-[2.85rem]"
          >
            <span className="block text-website-text lg:whitespace-nowrap">{hero.titleLine1}</span>
            <span className="relative mt-2 inline-block text-website-primary sm:mt-2.5 lg:whitespace-nowrap">
              {hero.titleLine2}
              <span
                className="absolute -bottom-1 start-0 h-1 w-10 rounded-full bg-website-secondary sm:w-14"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className={`mt-4 max-w-xl sm:mt-5 ${homeDescriptionSizeClassName} ${homeBodyClassName}`}>
            {hero.description}
          </p>

          <HeroButtons locale={locale} />
          <HeroStats stats={hero.stats} />
        </div>

        <div className="relative z-10 hidden aspect-[4/3] w-full max-w-md px-4 sm:max-w-lg sm:px-6 lg:mx-0 lg:block lg:aspect-auto lg:h-[calc(100dvh-5rem)] lg:max-w-none lg:px-0 lg:pb-0">
          <Image
            src="/images/home-hero-image.png"
            alt={hero.imageAlt}
            fill
            priority
            className="object-contain object-top object-end rtl:scale-x-[-1]"
            sizes="50vw"
          />
        </div>
      </div>
    </section>
  );
}
