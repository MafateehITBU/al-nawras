import type { SupportedLocale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";

export function getServiceDetailPath(serviceId: string, locale: SupportedLocale) {
  return localizePath(`/services/${serviceId}`, locale);
}

export function isServicesRoute(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const offset = segments.length > 0 && (segments[0] === "en" || segments[0] === "ar") ? 1 : 0;
  return segments[offset] === "services";
}

export function isNavItemActive(
  pathname: string,
  href: string,
  key: string,
): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const localeOffset =
    segments.length > 0 && (segments[0] === "en" || segments[0] === "ar") ? 1 : 0;
  const routeSegments = segments.slice(localeOffset);
  const normalizedHref = href.replace(/^\//, "");

  if (key === "home") {
    return routeSegments.length === 0;
  }

  if (key === "services") {
    return routeSegments[0] === "services";
  }

  if (!normalizedHref) return false;

  return routeSegments[0] === normalizedHref.split("/")[0];
}
