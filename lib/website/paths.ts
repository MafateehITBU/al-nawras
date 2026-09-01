import type { SupportedLocale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";

export function getServiceDetailPath(serviceSlug: string, locale: SupportedLocale) {
  return localizePath(`/services/${serviceSlug}`, locale);
}

export function getServiceCategoryPath(categorySlug: string, locale: SupportedLocale) {
  return localizePath(`/services/category/${categorySlug}`, locale);
}

export function getBlogDetailPath(blogSlug: string, locale: SupportedLocale) {
  return localizePath(`/blog/${blogSlug}`, locale);
}

export function getBlogListingPath(locale: SupportedLocale) {
  return localizePath("/blog", locale);
}

export function buildBlogListingQuery(params: {
  page?: number;
  search?: string;
  category?: string;
}) {
  const query = new URLSearchParams();
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.category) query.set("category", params.category);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export function getBlogAttachmentDownloadPath(slug: string) {
  return `/api/blogs/${slug}/attachment`;
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
