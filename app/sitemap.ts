import { SUPPORTED_LOCALES } from "@/constants";
import {
  WEBSITE_FOOTER_QUICK_LINKS,
  WEBSITE_HEADER_NAV,
  WEBSITE_LEGAL_PATHS,
} from "@/constants/website-nav";
import { getSiteUrl, localizePath } from "@/lib/i18n/config";
import { listPublicServiceSlugs } from "@/lib/services/service.service";
import type { MetadataRoute } from "next";

const HEADER_PATHS = WEBSITE_HEADER_NAV.map((item) => item.href);
const QUICK_PATHS = WEBSITE_FOOTER_QUICK_LINKS.map((item) => item.href);

const STATIC_PUBLIC_PATHS = [
  ...HEADER_PATHS,
  ...QUICK_PATHS.filter((href) => !HEADER_PATHS.includes(href as (typeof HEADER_PATHS)[number])),
  WEBSITE_LEGAL_PATHS.terms,
  WEBSITE_LEGAL_PATHS.privacy,
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const services = await listPublicServiceSlugs();

  const staticEntries = SUPPORTED_LOCALES.flatMap((locale) =>
    STATIC_PUBLIC_PATHS.map((path) => ({
      url: `${siteUrl}${localizePath(path || "/", locale)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((alt) => [
            alt,
            `${siteUrl}${localizePath(path || "/", alt)}`,
          ]),
        ),
      },
    })),
  );

  const serviceEntries = services.flatMap(({ slug, updatedAt }) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${siteUrl}${localizePath(`/services/${slug}`, locale)}`,
      lastModified: updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((alt) => [
            alt,
            `${siteUrl}${localizePath(`/services/${slug}`, alt)}`,
          ]),
        ),
      },
    })),
  );

  return [...staticEntries, ...serviceEntries];
}
