import { PagePlaceholder } from "@/components/website/page-placeholder";
import { isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pickLocalizedField } from "@/lib/i18n/content";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { getServiceById } from "@/lib/services/service.service";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeParam, id } = await params;
  if (!isSupportedLocale(localeParam)) return {};

  try {
    const service = await getServiceById(id);
    const title = pickLocalizedField(service, "name", localeParam);
    return buildWebsiteMetadata({
      locale: localeParam,
      title,
      path: `/services/${id}`,
    });
  } catch {
    return {};
  }
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[locale]/services/[id]">) {
  const { locale: localeParam, id } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  let service;
  try {
    service = await getServiceById(id);
  } catch {
    notFound();
  }

  const title = pickLocalizedField(service, "name", localeParam);
  return <PagePlaceholder locale={localeParam} title={title} />;
}
