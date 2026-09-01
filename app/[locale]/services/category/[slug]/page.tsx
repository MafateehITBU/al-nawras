import { ServiceCategoryPage } from "@/components/website/service/service-category-page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { pickLocalizedField } from "@/lib/i18n/content";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { getPublicServiceCategoryPageData } from "@/lib/services/service.service";
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
    const category = await getPublicServiceCategoryPageData(slug);
    const title = pickLocalizedField(category, "name", localeParam);
    const description = excerptPlainText(
      pickLocalizedField(category, "description", localeParam),
      160,
    );
    const firstServiceImage = category.services[0]?.overviewImageUrl;

    return buildWebsiteMetadata({
      locale: localeParam,
      title,
      description,
      path: `/services/category/${slug}`,
      imageUrl: firstServiceImage || null,
    });
  } catch {
    return {};
  }
}

export default async function ServiceCategoryRoutePage({
  params,
}: PageProps<"/[locale]/services/category/[slug]">) {
  const { locale: localeParam, slug } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  let category;
  try {
    category = await getPublicServiceCategoryPageData(slug);
  } catch {
    notFound();
  }

  return <ServiceCategoryPage locale={localeParam} category={category} />;
}
