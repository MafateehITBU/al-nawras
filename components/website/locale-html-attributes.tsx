"use client";

import { isRtlLocale, type SupportedLocale } from "@/lib/i18n/config";
import { useEffect } from "react";

export function LocaleHtmlAttributes({ locale }: { locale: SupportedLocale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
