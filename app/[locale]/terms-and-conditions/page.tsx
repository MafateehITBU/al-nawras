import { TermsPage } from "@/components/website/legal/terms-page";
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
    title: dictionary.footer.termsAndConditions,
    path: "/terms-and-conditions",
  });
}

export default async function TermsAndConditionsRoute({
  params,
}: PageProps<"/[locale]/terms-and-conditions">) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  return <TermsPage locale={localeParam} />;
}
