import { SUPPORTED_LOCALES } from "@/constants";
import {
  WEBSITE_FOOTER_QUICK_LINKS,
  WEBSITE_HEADER_NAV,
  WEBSITE_LEGAL_PATHS,
} from "@/constants/website-nav";
import { getSiteUrl, localizePath } from "@/lib/i18n/config";
import type { MetadataRoute } from "next";

const HEADER_PATHS = WEBSITE_HEADER_NAV.map((item) => item.href);
const QUICK_PATHS = WEBSITE_FOOTER_QUICK_LINKS.map((item) => item.href);

const PUBLIC_PATHS = [
  ...HEADER_PATHS,
  ...QUICK_PATHS.filter((href) => !HEADER_PATHS.includes(href as (typeof HEADER_PATHS)[number])),
  WEBSITE_LEGAL_PATHS.terms,
  WEBSITE_LEGAL_PATHS.privacy,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return SUPPORTED_LOCALES.flatMap((locale) =>
    PUBLIC_PATHS.map((path) => ({
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
}
