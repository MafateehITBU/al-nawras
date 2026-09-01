import { ContactPageView } from "@/components/website/contact/contact-page";
import { getContactPageContent } from "@/lib/i18n/contact-page-content";
import { isSupportedLocale } from "@/lib/i18n/config";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { listPublicContactServices } from "@/lib/services/service.service";
import { getWebsiteContent } from "@/lib/services/website.service";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) return {};

  const content = getContactPageContent(localeParam);
  return buildWebsiteMetadata({
    locale: localeParam,
    title: content.seo.title,
    description: content.seo.description,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  const [website, services] = await Promise.all([
    getWebsiteContent(),
    listPublicContactServices(),
  ]);

  return (
    <ContactPageView locale={localeParam} website={website} services={services} />
  );
}
