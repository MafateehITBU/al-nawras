import { IconifyIcon } from "@/components/website/service/iconify-icon";
import { SquareImageFrame } from "@/components/website/service/square-image-frame";
import { serviceDescriptionClassName, serviceSectionClassName } from "@/components/website/service/service-section-styles";
import { pickLocalizedField } from "@/lib/i18n/content";
import {
  getCompanyDisplayName,
  getServicePageContent,
} from "@/lib/i18n/service-page-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { Service } from "@prisma/client";

type ServiceOverviewData = Pick<
  Service,
  | "overviewTitleEn"
  | "overviewTitleAr"
  | "overviewDescriptionEn"
  | "overviewDescriptionAr"
  | "overviewImageUrl"
  | "nameEn"
  | "nameAr"
>;

export function ServiceOverview({
  locale,
  service,
}: {
  locale: SupportedLocale;
  service: ServiceOverviewData;
}) {
  const content = getServicePageContent(locale);
  const overviewTitle = pickLocalizedField(service, "overviewTitle", locale);
  const overviewDescription = pickLocalizedField(service, "overviewDescription", locale);
  const serviceName = pickLocalizedField(service, "name", locale);
  const companyName = getCompanyDisplayName(locale);

  return (
    <section className={serviceSectionClassName} aria-labelledby="service-overview-title">
      <div className="website-container">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <SquareImageFrame
            src={service.overviewImageUrl}
            alt={serviceName}
            frameColor="#3CB0FF1A"
          />

          <div>
            <div
              className="inline-flex w-fit items-center gap-2.5 rounded-md border border-website-border px-5 py-2"
              style={{ backgroundColor: "#E5EEFF" }}
            >
              <IconifyIcon
                icon="mdi:medal-outline"
                className="size-5 text-website-primary"
              />
              <span className="website-body text-sm font-semibold uppercase tracking-wide text-website-primary">
                {content.expertise}
              </span>
            </div>

            <h2
              id="service-overview-title"
              className="website-heading mt-5 text-2xl font-bold text-website-text sm:text-3xl lg:text-[2rem]"
            >
              {overviewTitle}
            </h2>

            <p className="website-body mt-2 text-base text-website-text sm:text-lg">
              {content.at}{" "}
              <span className="font-semibold text-website-primary">{companyName}</span>
            </p>

            <p
              className={`mt-5 border-s-4 border-website-bg ps-4 text-base sm:text-[1.0625rem] ${serviceDescriptionClassName}`}
            >
              {overviewDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
