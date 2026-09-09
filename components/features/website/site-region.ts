import type { SiteRegion } from "@prisma/client";

export const SITE_REGION_OPTIONS: { value: SiteRegion; label: string }[] = [
  { value: "AE", label: "UAE & Gulf (AE)" },
  { value: "JO", label: "Jordan (JO)" },
];

export const SITE_REGION_LABELS: Record<SiteRegion, string> = {
  AE: "UAE & Gulf",
  JO: "Jordan",
};

export const DEFAULT_SITE_REGION: SiteRegion = "AE";
