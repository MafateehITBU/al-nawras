import type { SupportedLocale } from "@/lib/i18n/config";
import { getCountries, type CountryCode } from "libphonenumber-js";

export interface CountryOption {
  code: CountryCode;
  name: string;
}

const displayNames: Record<SupportedLocale, Intl.DisplayNames> = {
  en: new Intl.DisplayNames(["en"], { type: "region" }),
  ar: new Intl.DisplayNames(["ar"], { type: "region" }),
};

export function getCountryOptions(locale: SupportedLocale): CountryOption[] {
  return getCountries()
    .map((code) => ({
      code,
      name: displayNames[locale].of(code) ?? code,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}
