import type {
  WebsiteAddress,
  WebsiteMapLocation,
  WebsitePhone,
  WebsiteSettings,
  WebsiteSocialLink,
} from "@prisma/client";

export interface WebsiteContent {
  settings: WebsiteSettings;
  phones: WebsitePhone[];
  addresses: WebsiteAddress[];
  mapLocations: WebsiteMapLocation[];
  socialLinks: WebsiteSocialLink[];
}

export type MapLocation = WebsiteMapLocation & {
  latitude: number | string;
  longitude: number | string;
};

export function toNumber(value: number | string | { toString(): string }): number {
  return typeof value === "number" ? value : parseFloat(value.toString());
}

export const SOCIAL_PLATFORM_LABELS: Record<string, string> = {
  LINKEDIN: "LinkedIn",
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  X: "X (Twitter)",
};
