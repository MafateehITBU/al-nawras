import { ServiceDetailsPage } from "@/components/website/service/service-details-page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { pickLocalizedField } from "@/lib/i18n/content";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { getPublicServicePageData } from "@/lib/services/service.service";
import { excerptPlainText } from "@/lib/utils/text";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isSupportedLocale(localeParam)) return {};

  try {
    const { service } = await getPublicServicePageData(slug);
    const title = pickLocalizedField(service, "name", localeParam);
    const description = excerptPlainText(
      pickLocalizedField(service, "heroDescription", localeParam),
      160,
    );

    return buildWebsiteMetadata({
      locale: localeParam,
      title,
      description,
      path: `/services/${slug}`,
      imageUrl: service.overviewImageUrl || null,
    });
  } catch {
    return {};
  }
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[locale]/services/[slug]">) {
  const { locale: localeParam, slug } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  let data;
  try {
    data = await getPublicServicePageData(slug);
  } catch {
    notFound();
  }

  return <ServiceDetailsPage locale={localeParam} data={data} />;
}
