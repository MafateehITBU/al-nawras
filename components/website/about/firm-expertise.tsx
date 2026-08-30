import { FirmExpertisePoint } from "@/components/website/about/firm-expertise-point";
import { aboutBodyClassName, aboutSectionClassName } from "@/components/website/about/about-section-styles";
import { PrimaryButton } from "@/components/website/primary-button";
import { getAboutPageContent } from "@/lib/i18n/about-page-content";
import { localizePath } from "@/lib/i18n/config";
import type { SupportedLocale } from "@/lib/i18n/config";
import Image from "next/image";

export function FirmExpertise({ locale }: { locale: SupportedLocale }) {
  const { firmExpertise } = getAboutPageContent(locale);
  const contactHref = localizePath("/contact", locale);

  return (
    <section
      className={`bg-website-bg ${aboutSectionClassName}`}
      aria-labelledby="firm-expertise-title"
    >
      <div className="website-container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl lg:mx-0 lg:max-w-none">
            <Image
              src="/images/about.png"
              alt={firmExpertise.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 shrink-0 bg-website-primary sm:w-12"
                aria-hidden="true"
              />
              <span
                className={`website-body text-xs font-semibold text-website-primary ${
                  locale === "en" ? "uppercase tracking-[0.15em]" : "tracking-wide"
                }`}
              >
                {firmExpertise.label}
              </span>
            </div>

            <h2
              id="firm-expertise-title"
              className="website-heading mt-4 text-2xl font-bold text-website-text sm:text-3xl lg:text-[2rem]"
            >
              {firmExpertise.title}
            </h2>

            <div className={`mt-4 space-y-4 text-base sm:mt-5 sm:text-[1.0625rem] ${aboutBodyClassName}`}>
              {firmExpertise.descriptionParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-6 space-y-5 sm:mt-8" role="list">
              {firmExpertise.points.map((point) => (
                <li key={point.title}>
                  <FirmExpertisePoint point={point} />
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PrimaryButton href={contactHref}>{firmExpertise.contactCta}</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
