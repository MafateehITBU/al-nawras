"use client";

import { Icon } from "@iconify/react";
import { NavbarLogo } from "@/components/website/navbar-logo";
import { PrimaryButton } from "@/components/website/primary-button";
import { MobileServicesSection } from "@/components/website/services-mega-menu";
import { WEBSITE_HEADER_NAV } from "@/constants/website-nav";
import { getAlternateLocaleLabel, type WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import type { PublicServicesMenuCategory } from "@/lib/services/service.service";
import { isNavItemActive } from "@/lib/website/paths";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function MobileNav({
  locale,
  dictionary,
  categories,
  contactHref,
  logoUrl,
  isOpen,
  onClose,
  panelId,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  categories: PublicServicesMenuCategory[];
  contactHref: string;
  logoUrl?: string | null;
  isOpen: boolean;
  onClose: () => void;
  panelId: string;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const otherLocale: SupportedLocale = locale === "en" ? "ar" : "en";
  const homeHref = localizePath("/", locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavigate = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-website-text/40"
        aria-label={dictionary.actions.closeMenu}
        onClick={onClose}
      />

      <nav
        ref={panelRef}
        id={panelId}
        aria-label="Mobile"
        className={cn(
          "website-mobile-panel fixed inset-y-0 flex h-dvh w-[min(100%,20rem)] flex-col bg-website-surface shadow-xl",
          locale === "en"
            ? "right-0 animate-mobile-panel-in-from-end"
            : "left-0 animate-mobile-panel-in-from-start",
        )}
      >
        <div className="flex items-center justify-between border-b border-website-border px-4 py-3">
          <NavbarLogo logoUrl={logoUrl} href={homeHref} />
          <button
            ref={closeButtonRef}
            type="button"
            className="website-focus-ring rounded-sm p-2 text-website-text"
            aria-label={dictionary.actions.closeMenu}
            onClick={onClose}
          >
            <Icon icon="lucide:x" className="size-5" aria-hidden />
          </button>
        </div>

        <ul className="flex-1 space-y-1 overflow-y-auto px-4 py-4" role="list">
          {WEBSITE_HEADER_NAV.filter((item) => item.key !== "services").map((item) => {
            const href = localizePath(item.href || "/", locale);
            const isActive = isNavItemActive(pathname, item.href, item.key);

            return (
              <li key={item.key}>
                <Link
                  href={href}
                  className={cn(
                    "website-body block py-2.5 text-base website-focus-ring",
                    isActive
                      ? "font-semibold text-website-primary"
                      : "text-website-text hover:text-website-primary",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onClick={handleNavigate}
                >
                  {dictionary.nav[item.key]}
                </Link>
              </li>
            );
          })}

          <MobileServicesSection
            locale={locale}
            dictionary={dictionary}
            categories={categories}
            onNavigate={handleNavigate}
          />
        </ul>

        <div className="mt-auto space-y-3 border-t border-website-border p-4">
          <Link
            href={localizePath(pathname, otherLocale)}
            className="website-body flex items-center justify-center rounded-md border border-website-border py-2.5 text-base font-semibold text-website-text transition-colors hover:border-website-primary hover:text-website-primary website-focus-ring"
            lang={otherLocale}
            hrefLang={otherLocale}
            aria-label={dictionary.actions.switchLanguage}
            onClick={handleNavigate}
          >
            {getAlternateLocaleLabel(locale)}
          </Link>
          <PrimaryButton href={contactHref} className="w-full" onClick={handleNavigate}>
            {dictionary.actions.getInTouch}
          </PrimaryButton>
        </div>
      </nav>
    </div>,
    document.body,
  );
}
