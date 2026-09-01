import { ContactHero } from "@/components/website/contact/contact-hero";
import { ContactSection } from "@/components/website/contact/contact-section";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { listPublicContactServices } from "@/lib/services/service.service";
import type { getWebsiteContent } from "@/lib/services/website.service";

type WebsiteContent = Awaited<ReturnType<typeof getWebsiteContent>>;
type ContactService = Awaited<ReturnType<typeof listPublicContactServices>>[number];

export function ContactPageView({
  locale,
  website,
  services,
}: {
  locale: SupportedLocale;
  website: WebsiteContent;
  services: ContactService[];
}) {
  return (
    <>
      <ContactHero locale={locale} />
      <ContactSection locale={locale} website={website} services={services} />
    </>
  );
}
