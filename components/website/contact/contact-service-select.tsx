"use client";

import { ContactSearchableSelect } from "@/components/website/contact/contact-searchable-select";
import type { ContactSelectOption } from "@/components/website/contact/contact-searchable-select";

export function ContactServiceSelect({
  value,
  onChange,
  options,
  label,
  placeholder,
  searchPlaceholder,
  error,
  required,
}: {
  value: string;
  onChange: (serviceId: string) => void;
  options: ContactSelectOption[];
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  error?: string;
  required?: boolean;
}) {
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
