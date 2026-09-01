import { BlogDetailsPage } from "@/components/website/blog/blog-details-page";
import { isSupportedLocale } from "@/lib/i18n/config";
import { pickLocalizedField } from "@/lib/i18n/content";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { getPublicBlogPageData } from "@/lib/services/blog.service";
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
    const { blog } = await getPublicBlogPageData(slug);
    const title = pickLocalizedField(blog, "title", localeParam);
    const description = excerptPlainText(
      pickLocalizedField(blog, "content", localeParam),
      160,
    );

    return buildWebsiteMetadata({
      locale: localeParam,
      title,
      description,
      path: `/blog/${slug}`,
      imageUrl: blog.featuredImageUrl || null,
    });
  } catch {
    return {};
  }
}

export default async function BlogDetailRoute({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: localeParam, slug } = await params;
  if (!isSupportedLocale(localeParam)) notFound();

  let data;
  try {
    data = await getPublicBlogPageData(slug);
  } catch {
    notFound();
  }

  return <BlogDetailsPage locale={localeParam} data={data} />;
}
