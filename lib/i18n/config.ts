import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "@/constants";

export { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale };

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
}

export function isRtlLocale(locale: SupportedLocale): boolean {
  return locale === "ar";
}

export function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export function localizePath(path: string, locale: SupportedLocale) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length > 0 && isSupportedLocale(segments[0]!)) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isSupportedLocale(segments[0]!)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname || "/";
}

export function switchLocalePath(pathname: string, locale: SupportedLocale) {
  return localizePath(stripLocaleFromPathname(pathname), locale);
}
