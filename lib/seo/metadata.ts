import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import type { SupportedLocale } from "@/lib/i18n/config";
import { getSiteUrl, localizePath } from "@/lib/i18n/config";
import type { Metadata } from "next";

export interface WebsiteMetadataInput {
  locale: SupportedLocale;
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string | null;
  noIndex?: boolean;
}

export function buildWebsiteMetadata({
  locale,
  title,
  description = APP_DESCRIPTION,
  path = "/",
  imageUrl,
  noIndex = false,
}: WebsiteMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = localizePath(path, locale);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const ogImage = imageUrl ?? `${siteUrl}/logo.png`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}${localizePath(path, "en")}`,
        ar: `${siteUrl}${localizePath(path, "ar")}`,
        "x-default": `${siteUrl}${localizePath(path, "en")}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_JO" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_JO"],
      url: canonicalUrl,
      siteName: APP_NAME,
      title: pageTitle,
      description,
      images: [{ url: ogImage, alt: APP_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
