"use client";

import { ContactSearchableSelect } from "@/components/website/contact/contact-searchable-select";
import { getCountryOptions } from "@/lib/data/countries";
import type { SupportedLocale } from "@/lib/i18n/config";
import { useMemo } from "react";

export function ContactCountrySelect({
  locale,
  value,
  onChange,
  label,
  placeholder,
  searchPlaceholder,
  error,
  required,
}: {
  locale: SupportedLocale;
  value: string;
  onChange: (countryName: string) => void;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  error?: string;
  required?: boolean;
}) {
  const options = useMemo(
    () =>
      getCountryOptions(locale).map((country) => ({
        value: country.name,
        label: country.name,
      })),
    [locale],
  );

  return (
    <ContactSearchableSelect
      value={value}
      onChange={onChange}
      options={options}
      label={label}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      error={error}
      required={required}
    />
  );
}
