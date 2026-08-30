import { HomePage } from "@/components/website/home/home-page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getHomePageContent } from "@/lib/i18n/home-page-content";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) return {};

  const content = getHomePageContent(localeParam);
  return buildWebsiteMetadata({
    locale: localeParam,
    title: content.seo.title,
    description: content.seo.description,
    path: "/",
  });
}

export default async function HomeRoute({ params }: PageProps<"/[locale]">) {
  const { locale: localeParam } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  return <HomePage locale={localeParam} />;
}
