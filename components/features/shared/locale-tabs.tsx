"use client";

import { cn } from "@/lib/utils";
import { LOCALE_LABELS, type SupportedLocale } from "@/constants";

export function LocaleTabs({
  active,
  onChange,
  className,
}: {
  active: SupportedLocale;
  onChange: (locale: SupportedLocale) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex rounded-lg border border-dashboard-border p-1", className)}>
      {(["en", "ar"] as SupportedLocale[]).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={cn(
            "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-ring",
            active === locale
              ? "bg-dashboard-primary text-white"
              : "text-dashboard-text-muted hover:text-dashboard-text",
          )}
        >
          {LOCALE_LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
