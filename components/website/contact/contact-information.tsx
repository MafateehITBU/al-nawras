import { Icon } from "@iconify/react";
import { ContactInfoItem } from "@/components/website/contact/contact-info-item";
import { ContactMap } from "@/components/website/contact/contact-map";
import { getContactPageContent } from "@/lib/i18n/contact-page-content";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { getWebsiteContent } from "@/lib/services/website.service";

type WebsiteContent = Awaited<ReturnType<typeof getWebsiteContent>>;

export function ContactInformation({
  locale,
  website,
}: {
  locale: SupportedLocale;
  website: WebsiteContent;
}) {
  const content = getContactPageContent(locale);
  const { contactInfo } = content;
  const { settings, phones, addresses, mapLocations } = website;

  const primaryAddress = addresses[0] ?? null;
  const primaryLocation = mapLocations[0] ?? null;

  const latitude = primaryLocation ? Number(primaryLocation.latitude) : NaN;
  const longitude = primaryLocation ? Number(primaryLocation.longitude) : NaN;
  const hasMap = Number.isFinite(latitude) && Number.isFinite(longitude);

  const mapsUrl = hasMap
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    : null;

  return (
    <div>
      <h2 className="website-heading text-2xl font-bold text-website-text sm:text-[1.75rem]">
        {contactInfo.heading}
      </h2>

      <div className="mt-6 space-y-6 sm:mt-8">
        {primaryAddress ? (
          <ContactInfoItem icon="lucide:map-pin" label={contactInfo.officeLocation}>
            <p className="whitespace-pre-line">
              {pickLocalizedField(primaryAddress, "address", locale)}
            </p>
          </ContactInfoItem>
        ) : null}

        {phones.length > 0 ? (
          <ContactInfoItem icon="lucide:phone" label={contactInfo.phone}>
            <ul className="space-y-1" role="list">
              {phones.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={`tel:${phone.phoneNumber.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-website-primary website-focus-ring rounded-sm"
                  >
                    {phone.label ? `${phone.label}: ` : ""}
                    {phone.phoneNumber}
                  </a>
                </li>
              ))}
            </ul>
          </ContactInfoItem>
        ) : null}

        {settings.contactEmail ? (
          <ContactInfoItem icon="lucide:mail" label={contactInfo.email}>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="break-all transition-colors hover:text-website-primary website-focus-ring rounded-sm"
            >
              {settings.contactEmail}
            </a>
          </ContactInfoItem>
        ) : null}

        {hasMap ? (
          <div className="overflow-hidden rounded-xl border border-website-border">
            <ContactMap
              latitude={latitude}
              longitude={longitude}
              locale={locale}
              title={contactInfo.officeLocation}
            />
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="website-body flex items-center gap-2 bg-website-footer px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-website-card-dark website-focus-ring"
              >
                <Icon icon="lucide:map-pin" className="size-4 shrink-0" aria-hidden />
                {contactInfo.viewOnMap}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
