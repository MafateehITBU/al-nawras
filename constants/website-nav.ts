export const WEBSITE_HEADER_NAV = [
  { key: "home" as const, href: "" },
  { key: "about" as const, href: "/about" },
  { key: "services" as const, href: "/services", megaMenu: true as const },
  { key: "contact" as const, href: "/contact" },
] as const;

export const WEBSITE_FOOTER_COMPANY_LINKS = [
  { key: "home" as const, href: "" },
  { key: "about" as const, href: "/about" },
  { key: "contact" as const, href: "/contact" },
] as const;

export const WEBSITE_FOOTER_QUICK_LINKS = [
  { key: "blog" as const, href: "/blog" },
  { key: "privacyPolicy" as const, href: "/privacy-policy" },
] as const;

export const WEBSITE_LEGAL_PATHS = {
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",
} as const;

export type WebsiteHeaderNavKey = (typeof WEBSITE_HEADER_NAV)[number]["key"];
export type WebsiteFooterCompanyNavKey = (typeof WEBSITE_FOOTER_COMPANY_LINKS)[number]["key"];
export type WebsiteFooterQuickNavKey = (typeof WEBSITE_FOOTER_QUICK_LINKS)[number]["key"];
