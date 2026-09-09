import { cookies, headers } from "next/headers";
import type { SiteRegion } from "@prisma/client";
import { getWebsiteContent } from "@/lib/services/website.service";
import {
  COOKIE_CONSENT_COOKIE,
  filterBySiteRegion,
  getCountryCodeFromHeaders,
  resolveSiteRegion,
  SITE_REGION_COOKIE,
} from "@/lib/website/site-region";

export async function getResolvedSiteRegion(): Promise<SiteRegion> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  return resolveSiteRegion({
    cookieConsent: cookieStore.get(COOKIE_CONSENT_COOKIE)?.value,
    cookieRegion: cookieStore.get(SITE_REGION_COOKIE)?.value,
    countryCode: getCountryCodeFromHeaders(headerStore),
  });
}

export async function getRegionalWebsiteContent() {
  const [website, region] = await Promise.all([
    getWebsiteContent(),
    getResolvedSiteRegion(),
  ]);

  return {
    website: {
      ...website,
      phones: filterBySiteRegion(website.phones, region),
      addresses: filterBySiteRegion(website.addresses, region),
      mapLocations: filterBySiteRegion(website.mapLocations, region),
    },
    region,
  };
}
