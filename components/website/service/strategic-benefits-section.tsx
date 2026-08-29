import { StrategicBenefitItem } from "@/components/website/service/strategic-benefit-item";
import { SquareImageFrame } from "@/components/website/service/square-image-frame";
import { serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { pickLocalizedField } from "@/lib/i18n/content";
import { getServicePageContent } from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { Service, ServiceStrategicBenefit } from "@prisma/client";

type StrategicBenefitsData = Pick<
  Service,
  "strategicBenefitsImageUrl" | "nameEn" | "nameAr"
> & {
  strategicBenefits: ServiceStrategicBenefit[];
};

export function StrategicBenefitsSection({
  locale,
  service,
}: {
  locale: SupportedLocale;
  service: StrategicBenefitsData;
}) {
  const content = getServicePageContent(locale);
  const serviceName = pickLocalizedField(service, "name", locale);

  return (
    <section
      className={`bg-website-bg ${serviceSectionClassName}`}
      aria-labelledby="strategic-benefits-title"
    >
      <div className="website-container">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              id="strategic-benefits-title"
              className="website-heading text-2xl font-bold text-website-text sm:text-3xl"
            >
              {content.strategicBenefits}
            </h2>

            <ul className="mt-6 space-y-5 sm:mt-8" role="list">
              {service.strategicBenefits.map((benefit) => (
                <li key={benefit.id}>
                  <StrategicBenefitItem locale={locale} benefit={benefit} />
                </li>
              ))}
            </ul>
          </div>

          <SquareImageFrame
            src={service.strategicBenefitsImageUrl}
            alt={`${serviceName} — ${content.strategicBenefits}`}
          />
        </div>
      </div>
    </section>
  );
}
