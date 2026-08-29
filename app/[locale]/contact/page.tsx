import { PagePlaceholder } from "@/components/website/page-placeholder";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) return {};
  const dictionary = getDictionary(localeParam);
  return buildWebsiteMetadata({
    locale: localeParam,
    title: dictionary.nav.contact,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();
  const dictionary = getDictionary(localeParam);
  return <PagePlaceholder locale={localeParam} title={dictionary.nav.contact} />;
}
