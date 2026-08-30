import {
  EXPERTISE_IMAGE_HEIGHT,
  EXPERTISE_IMAGE_WIDTH,
  ExpertiseFloatingBadge,
} from "@/components/website/home/expertise-floating-badge";
import {
  homeDescriptionSizeClassName,
  homeTextClassName,
  homeViewportSectionContentClassName,
} from "@/components/website/home/home-section-styles";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import Image from "next/image";

export function ExpertiseSection({ locale }: { locale: SupportedLocale }) {
  const { expertise } = getHomePageContent(locale);

  return (
    <section
      className="flex flex-col justify-center overflow-visible bg-website-surface py-10 sm:py-12 lg:h-[calc(100dvh-5rem)] lg:overflow-visible lg:py-12"
      aria-labelledby="expertise-title"
    >
      <div className={`${homeViewportSectionContentClassName} overflow-visible lg:overflow-x-visible`}>
        <div className="grid items-center gap-10 overflow-visible lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <h2
              id="expertise-title"
              className="website-heading text-[1.75rem] font-bold leading-tight text-website-text sm:text-[2.125rem] lg:text-[2.5rem] xl:text-[2.65rem]"
            >
              {expertise.titleLine1}{" "}
              <span className="font-normal italic text-website-secondary">
                {expertise.titleHighlight}
              </span>
            </h2>

            <div className={`mt-5 space-y-4 sm:mt-6 ${homeDescriptionSizeClassName} ${homeTextClassName}`}>
              {expertise.descriptionParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[608px] overflow-visible ps-[79px] sm:ps-[105px] lg:mx-0 lg:ps-0">
            <div className="relative overflow-visible">
              <div className="relative h-[min(280px,58vw)] w-full overflow-hidden rounded-2xl sm:h-[400px] lg:h-[581px]">
                <Image
                  src="/images/home-expertise.png"
                  alt={expertise.imageAlt}
                  width={EXPERTISE_IMAGE_WIDTH}
                  height={EXPERTISE_IMAGE_HEIGHT}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 90vw, 608px"
                />
              </div>
              <ExpertiseFloatingBadge
                header={expertise.badgeHeader}
                description={expertise.badgeDescription}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
