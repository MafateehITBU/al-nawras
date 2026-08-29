"use client";

import { serviceDescriptionClassName } from "@/components/website/service/service-section-styles";
import { IconifyIcon } from "@/components/website/service/iconify-icon";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { ServiceStrategicBenefit } from "@prisma/client";

export function StrategicBenefitItem({
  locale,
  benefit,
}: {
  locale: SupportedLocale;
  benefit: ServiceStrategicBenefit;
}) {
  const title = pickLocalizedField(benefit, "title", locale);
  const description = pickLocalizedField(benefit, "description", locale);

  return (
    <article className="flex gap-4">
      <IconifyIcon icon={benefit.icon} className="size-6 shrink-0 text-website-primary" />
      <div className="min-w-0">
        <h3 className="website-heading text-base font-semibold text-website-text sm:text-lg">
          {title}
        </h3>
        <p className={`mt-1 text-sm sm:text-base ${serviceDescriptionClassName}`}>
          {description}
        </p>
      </div>
    </article>
  );
}
