import type { SupportedLocale } from "@/lib/i18n/config";

export function pickLocalizedField<T extends Record<string, unknown>>(
  record: T,
  baseField: string,
  locale: SupportedLocale,
): string {
  const enKey = `${baseField}En`;
  const arKey = `${baseField}Ar`;
  const localized = locale === "ar" ? record[arKey] : record[enKey];
  const fallback = record[enKey];

  if (typeof localized === "string" && localized.trim().length > 0) {
    return localized;
  }

  return typeof fallback === "string" ? fallback : "";
}

export function pickLocalizedOptionalField<T extends Record<string, unknown>>(
  record: T,
  baseField: string,
  locale: SupportedLocale,
): string | null {
  const value = pickLocalizedField(record, baseField, locale);
  return value.trim().length > 0 ? value : null;
}
