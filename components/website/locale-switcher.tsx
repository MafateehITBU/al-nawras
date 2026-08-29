"use client";

import { LOCALE_LABELS, type SupportedLocale } from "@/constants";
import { localizePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LocaleSwitcher({
  locale,
  label,
  className,
}: {
  locale: SupportedLocale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const otherLocale: SupportedLocale = locale === "en" ? "ar" : "en";

  return (
    <div className={cn("flex items-center gap-1 rounded-lg border border-website-border p-1", className)}>
      <span className="sr-only">{label}</span>
      {(["en", "ar"] as SupportedLocale[]).map((item) => {
        const isActive = item === locale;
        const href = localizePath(pathname, item);

        return (
          <Link
            key={item}
            href={href}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-ring sm:px-3 sm:text-sm",
              isActive
                ? "bg-website-primary text-white"
                : "text-website-muted hover:bg-website-bg hover:text-website-text",
            )}
            aria-current={isActive ? "page" : undefined}
            lang={item}
          >
            {LOCALE_LABELS[item]}
          </Link>
        );
      })}
      <span className="sr-only">
        {otherLocale === "ar" ? "Switch to Arabic" : "Switch to English"}
      </span>
    </div>
  );
}
