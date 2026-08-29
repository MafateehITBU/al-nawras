import { WebsiteFooter } from "@/components/website/website-footer";
import { WebsiteHeader } from "@/components/website/website-header";
import type { WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicServicesMenuCategory } from "@/lib/services/service.service";
import type { getWebsiteContent } from "@/lib/services/website.service";

type WebsiteContent = Awaited<ReturnType<typeof getWebsiteContent>>;

export function WebsiteShell({
  locale,
  dictionary,
  website,
  servicesMenu,
  children,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  website: WebsiteContent;
  servicesMenu: PublicServicesMenuCategory[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-website-surface text-website-text">
      <WebsiteHeader
        locale={locale}
        dictionary={dictionary}
        logoUrl={website.settings.logoUrl}
        categories={servicesMenu}
      />
      <main className="flex-1">{children}</main>
      <WebsiteFooter locale={locale} dictionary={dictionary} website={website} />
    </div>
  );
}
