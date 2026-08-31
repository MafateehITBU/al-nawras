import { WebsiteShell } from "@/components/website/website-shell";
import { LocaleHtmlAttributes } from "@/components/website/locale-html-attributes";
import { websiteFontVariables } from "@/lib/fonts/website";
import {
  isRtlLocale,
  isSupportedLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildWebsiteMetadata } from "@/lib/seo/metadata";
import { getWebsiteContent } from "@/lib/services/website.service";
import { getPublicServicesMenu } from "@/lib/services/service.service";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/** Re-fetch footer, header menu, and other CMS data from the database periodically. */
export const revalidate = 60;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isSupportedLocale(localeParam)) {
    return {};
  }

  return buildWebsiteMetadata({ locale: localeParam, path: "/" });
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: localeParam } = await params;

  if (!isSupportedLocale(localeParam)) {
    notFound();
  }

  const [website, dictionary, servicesMenu] = await Promise.all([
    getWebsiteContent(),
    Promise.resolve(getDictionary(localeParam)),
    getPublicServicesMenu(),
  ]);

  return (
    <>
      <LocaleHtmlAttributes locale={localeParam} />
      <div
        lang={localeParam}
        dir={isRtlLocale(localeParam) ? "rtl" : "ltr"}
        className={cn("website-root flex min-h-dvh flex-col", websiteFontVariables)}
      >
        <WebsiteShell
          locale={localeParam}
          dictionary={dictionary}
          website={website}
          servicesMenu={servicesMenu}
        >
          {children}
        </WebsiteShell>
      </div>
    </>
  );
}
