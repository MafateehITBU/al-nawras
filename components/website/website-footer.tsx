import { Mail, MapPin, Phone } from "lucide-react";
import { FooterLogo } from "@/components/website/footer-logo";
import { FooterSocialLinks } from "@/components/website/footer-social-links";
import {
  WEBSITE_FOOTER_COMPANY_LINKS,
  WEBSITE_FOOTER_QUICK_LINKS,
  WEBSITE_LEGAL_PATHS,
} from "@/constants/website-nav";
import { WEBSITE_ASSETS } from "@/constants/website-assets";
import type { WebsiteDictionary } from "@/lib/i18n/dictionaries";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import type { getWebsiteContent } from "@/lib/services/website.service";
import Link from "next/link";

type WebsiteContent = Awaited<ReturnType<typeof getWebsiteContent>>;

export function WebsiteFooter({
  locale,
  dictionary,
  website,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  website: WebsiteContent;
}) {
  const { settings, phones, addresses, socialLinks } = website;
  const year = new Date().getFullYear();
  const homeHref = localizePath("/", locale);

  return (
    <footer className="mt-auto bg-website-footer text-white">
      <div className="website-container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-12">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <FooterLogo href={homeHref} />
          <p className="website-body max-w-xs text-base leading-relaxed text-website-muted">
            {dictionary.footer.tagline}
          </p>
          <FooterSocialLinks links={socialLinks} />
        </div>

        <div>
          <h2 className="website-heading text-base font-semibold text-website-primary">
            {dictionary.footer.company}
          </h2>
          <ul className="mt-4 space-y-2.5" role="list">
            {WEBSITE_FOOTER_COMPANY_LINKS.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizePath(item.href || "/", locale)}
                  className="website-body text-base text-website-muted transition-colors hover:text-white website-focus-ring rounded-sm"
                >
                  {dictionary.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="website-heading text-base font-semibold text-website-primary">
            {dictionary.footer.quickLinks}
          </h2>
          <ul className="mt-4 space-y-2.5" role="list">
            {WEBSITE_FOOTER_QUICK_LINKS.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizePath(item.href, locale)}
                  className="website-body text-base text-website-muted transition-colors hover:text-white website-focus-ring rounded-sm"
                >
                  {item.key === "privacyPolicy"
                    ? dictionary.footer.privacyPolicy
                    : dictionary.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="website-heading text-base font-semibold text-website-primary">
            {dictionary.footer.contactsUs}
          </h2>
          <ul className="website-body mt-4 space-y-3 text-base text-website-muted" role="list">
            {settings.contactEmail && (
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-website-primary"
                  aria-hidden
                />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="break-all transition-colors hover:text-white website-focus-ring rounded-sm"
                >
                  {settings.contactEmail}
                </a>
              </li>
            )}

            {phones.length > 0 && (
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-website-primary"
                  aria-hidden
                />
                <div className="space-y-1">
                  {phones.map((phone) => (
                    <a
                      key={phone.id}
                      href={`tel:${phone.phoneNumber.replace(/\s/g, "")}`}
                      className="block transition-colors hover:text-white website-focus-ring rounded-sm"
                    >
                      {phone.label ? `${phone.label}: ` : ""}
                      {phone.phoneNumber}
                    </a>
                  ))}
                </div>
              </li>
            )}

            {addresses.length > 0 && (
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-website-primary"
                  aria-hidden
                />
                <div className="space-y-1">
                  {addresses.map((address) => (
                    <p key={address.id}>
                      {pickLocalizedField(address, "address", locale)}
                    </p>
                  ))}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="website-container flex flex-col gap-3 py-4 text-xs text-website-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {dictionary.footer.copyrightPrefix} {year}{" "}
            <a
              href={WEBSITE_ASSETS.external.mafateehGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white website-focus-ring rounded-sm"
            >
              Mafateeh Group
            </a>
          </p>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{dictionary.footer.allRightsReserved}</span>
            <span aria-hidden className="hidden sm:inline">
              |
            </span>
            <Link
              href={localizePath(WEBSITE_LEGAL_PATHS.terms, locale)}
              className="text-website-primary underline-offset-2 transition-colors hover:text-white hover:underline website-focus-ring rounded-sm"
            >
              {dictionary.footer.termsAndConditions}
            </Link>
            <span aria-hidden>|</span>
            <Link
              href={localizePath(WEBSITE_LEGAL_PATHS.privacy, locale)}
              className="text-website-primary underline-offset-2 transition-colors hover:text-white hover:underline website-focus-ring rounded-sm"
            >
              {dictionary.footer.privacyPolicy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
