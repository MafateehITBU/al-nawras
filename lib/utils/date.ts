import type { SupportedLocale } from "@/lib/i18n/config";

export function formatBlogDate(date: Date | string, locale: SupportedLocale): string {
  const value = new Date(date);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}
