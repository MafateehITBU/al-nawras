import { AboutPage } from "@/components/website/about/about-page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getAboutPageContent } from "@/lib/i18n/about-page-content";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) return {};

  const content = getAboutPageContent(localeParam);
  return buildWebsiteMetadata({
    locale: localeParam,
    title: content.seo.title,
    description: content.seo.description,
    path: "/about",
  });
}

export default async function AboutRoute({ params }: PageProps<"/[locale]/about">) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  return <AboutPage locale={localeParam} />;
}
