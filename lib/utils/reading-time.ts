import type { SupportedLocale } from "@/lib/i18n/config";
import { getBlogPageContent } from "@/lib/i18n/blog-page-content";

export function formatReadingTime(
  minutes: number,
  locale: SupportedLocale,
): string {
  const labels = getBlogPageContent(locale).readingTime;
  return labels.replace("{minutes}", String(minutes));
}
