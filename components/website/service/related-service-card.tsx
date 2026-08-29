import { serviceDescriptionClassName } from "@/components/website/service/service-section-styles";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { RelatedServiceSummary } from "@/lib/services/service.service";
import { excerptPlainText } from "@/lib/utils/text";
import { getServiceDetailPath } from "@/lib/website/paths";
import Image from "next/image";
import Link from "next/link";

export function RelatedServiceCard({
  locale,
  service,
}: {
  locale: SupportedLocale;
  service: RelatedServiceSummary;
}) {
  const name = pickLocalizedField(service, "name", locale);
  const heroDescription = pickLocalizedField(service, "heroDescription", locale);
  const excerpt = excerptPlainText(heroDescription, 120);
  const href = getServiceDetailPath(service.slug, locale);
  const hasImage = service.overviewImageUrl.trim().length > 0;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-website-surface shadow-sm transition-shadow hover:shadow-md website-focus-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-website-bg">
        {hasImage ? (
          <Image
            src={service.overviewImageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-website-muted">—</div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="website-heading text-lg font-semibold text-website-text transition-colors group-hover:text-website-primary">
          {name}
        </h3>
        <p className={`mt-2 line-clamp-3 flex-1 text-sm ${serviceDescriptionClassName}`}>
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
