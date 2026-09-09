import { CookieConsentBanner } from "@/components/website/cookie-consent-banner";
import { WebsiteFooter } from "@/components/website/website-footer";
import { WebsiteHeader } from "@/components/website/website-header";
import { WebsiteNavigationProvider } from "@/components/website/website-navigation-provider";
import { WebsiteToaster } from "@/components/website/website-toaster";
import { WhatsAppFloat } from "@/components/website/whatsapp-float";
import type { WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicServicesMenuCategory } from "@/lib/services/service.service";
import type { getWebsiteContent } from "@/lib/services/website.service";
import type { SiteRegion } from "@prisma/client";

type WebsiteContent = Awaited<ReturnType<typeof getWebsiteContent>>;

export function WebsiteShell({
  locale,
  dictionary,
  website,
  siteRegion,
  servicesMenu,
  children,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  website: WebsiteContent;
  siteRegion: SiteRegion;
  servicesMenu: PublicServicesMenuCategory[];
  children: React.ReactNode;
}) {
  const whatsappPhone = website.phones[0]?.phoneNumber ?? null;

  return (
    <WebsiteNavigationProvider logoUrl={website.settings.logoUrl}>
      <WebsiteToaster />
      <div className="flex min-h-dvh flex-1 flex-col overflow-x-clip bg-website-surface text-website-text">
        <WebsiteHeader
          locale={locale}
          dictionary={dictionary}
          logoUrl={website.settings.logoUrl}
          categories={servicesMenu}
        />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <WebsiteFooter locale={locale} dictionary={dictionary} website={website} />
        <WhatsAppFloat locale={locale} phoneNumber={whatsappPhone} />
        <CookieConsentBanner dictionary={dictionary} siteRegion={siteRegion} />
      </div>
    </WebsiteNavigationProvider>
  );
}
