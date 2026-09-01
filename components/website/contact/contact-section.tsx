import { ContactForm } from "@/components/website/contact/contact-form";
import { ContactInformation } from "@/components/website/contact/contact-information";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { listPublicContactServices } from "@/lib/services/service.service";
import type { getWebsiteContent } from "@/lib/services/website.service";

type WebsiteContent = Awaited<ReturnType<typeof getWebsiteContent>>;
type ContactService = Awaited<ReturnType<typeof listPublicContactServices>>[number];

export function ContactSection({
  locale,
  website,
  services,
}: {
  locale: SupportedLocale;
  website: WebsiteContent;
  services: ContactService[];
}) {
  return (
    <section className="bg-website-surface py-14 sm:py-16 lg:py-20 xl:py-24" aria-labelledby="contact-form-heading">
      <div className="website-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12 xl:gap-16">
          <ContactForm locale={locale} services={services} />
          <ContactInformation locale={locale} website={website} />
        </div>
      </div>
    </section>
  );
}
