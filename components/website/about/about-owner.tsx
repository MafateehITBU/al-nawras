import {
  aboutBodyClassName,
  aboutSectionClassName,
} from "@/components/website/about/about-section-styles";
import { PrimaryButton } from "@/components/website/primary-button";
import { getAboutPageContent } from "@/lib/i18n/about-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export function AboutOwner({ locale }: { locale: SupportedLocale }) {
  const { owner } = getAboutPageContent(locale);

  return (
    <section
      className={`bg-website-surface ${aboutSectionClassName}`}
      aria-labelledby="about-owner-title"
    >
      <div className="website-container">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-website-bg lg:mx-0 lg:max-h-[min(85vh,48rem)] lg:max-w-none lg:aspect-auto lg:h-[min(85vh,48rem)]">
              <Image
                src="/images/owner-awwad.jpg"
                alt={owner.imageAlt}
                fill
                quality={95}
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
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
                {owner.label}
              </span>
            </div>

            <h2
              id="about-owner-title"
              className="website-heading mt-4 text-2xl font-bold text-website-text sm:text-3xl lg:text-[2rem]"
            >
              {owner.name}
            </h2>

            <p className="website-body mt-2 text-base font-medium text-website-primary sm:text-lg">
              {owner.role}
            </p>

            <p className={`mt-4 text-base sm:mt-5 sm:text-[1.0625rem] ${aboutBodyClassName}`}>
              {owner.intro}
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {owner.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-website-primary/15 bg-website-primary/[0.04] px-4 py-3"
                >
                  <dt className="website-body text-xs font-medium uppercase tracking-wide text-website-primary [dir=rtl]:normal-case">
                    {item.label}
                  </dt>
                  <dd className="website-heading mt-1 text-lg font-bold text-website-text">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-4 sm:mt-7" role="list">
              {owner.points.map((point) => (
                <li key={point.title} className="flex gap-3">
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-website-primary text-white"
                    aria-hidden
                  >
                    <Check className="size-3.5 stroke-[2.5]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="website-heading text-base font-semibold text-website-text sm:text-lg">
                      {point.title}
                    </h3>
                    <p className="website-body mt-1 text-sm font-light leading-relaxed text-[#44474C] sm:text-[0.9375rem]">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PrimaryButton href={owner.portfolioUrl} external>
                {owner.readMoreCta}
                <ArrowUpRight className="size-4" aria-hidden />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
