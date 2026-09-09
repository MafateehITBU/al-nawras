import type { SiteRegion } from "@prisma/client";

export const SITE_REGION_COOKIE = "site_region";
export const COOKIE_CONSENT_COOKIE = "cookie_consent";
export const DEFAULT_SITE_REGION: SiteRegion = "AE";

/** GCC countries that should see UAE / Gulf contact details. */
const GULF_COUNTRY_CODES = new Set([
  "AE",
  "SA",
  "KW",
  "BH",
  "QA",
  "OM",
]);

export function isSiteRegion(value: string | undefined | null): value is SiteRegion {
  return value === "JO" || value === "AE";
}

export function countryCodeToSiteRegion(countryCode: string | null | undefined): SiteRegion {
  if (!countryCode) return DEFAULT_SITE_REGION;
  const code = countryCode.trim().toUpperCase();
  if (code === "JO") return "JO";
  if (GULF_COUNTRY_CODES.has(code)) return "AE";
  return DEFAULT_SITE_REGION;
}

export function getCountryCodeFromHeaders(headers: Headers): string | null {
  return (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    null
  );
}

/**
 * Prefer persisted cookie after consent; otherwise map IP country → region.
 * Falls back to UAE / Gulf.
 */
export function resolveSiteRegion(options: {
  cookieRegion?: string | null;
  cookieConsent?: string | null;
  countryCode?: string | null;
}): SiteRegion {
  if (
    options.cookieConsent === "accepted" &&
    isSiteRegion(options.cookieRegion)
  ) {
    return options.cookieRegion;
  }

  return countryCodeToSiteRegion(options.countryCode);
}

export function filterBySiteRegion<T extends { region: SiteRegion }>(
  items: T[],
  region: SiteRegion,
): T[] {
  const matched = items.filter((item) => item.region === region);
  if (matched.length > 0) return matched;
  if (region !== DEFAULT_SITE_REGION) {
    return items.filter((item) => item.region === DEFAULT_SITE_REGION);
  }
  return matched;
}

export function toWhatsAppDigits(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}
