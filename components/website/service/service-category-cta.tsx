import { PrimaryButton } from "@/components/website/primary-button";
import { serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { localizePath } from "@/lib/i18n/config";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";

export function ServiceCategoryCta({ locale }: { locale: SupportedLocale }) {
  const content = getServicePageContent(locale);
  const contactHref = localizePath("/contact", locale);

  return (
    <section
      className={`relative overflow-hidden bg-website-footer ${serviceSectionClassName}`}
      aria-labelledby="category-cta-title"
    >
      <div
        className="pointer-events-none absolute -end-16 top-0 size-56 rounded-full bg-website-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -start-16 size-64 rounded-full bg-website-secondary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="website-container relative mx-auto max-w-3xl text-center">
        <h2
          id="category-cta-title"
          className="website-heading text-2xl font-bold text-white sm:text-3xl lg:text-[2rem]"
        >
          {content.categoryCtaTitle}
        </h2>
        <p className="website-body mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
          {content.categoryCtaDescription}
        </p>
        <PrimaryButton href={contactHref} className="mt-8 sm:mt-10">
          {content.categoryCtaButton}
        </PrimaryButton>
      </div>
    </section>
  );
}
