"use client";

import { Icon } from "@iconify/react";
import { NavbarLogo } from "@/components/website/navbar-logo";
import { MobileNav } from "@/components/website/mobile-nav";
import { PrimaryButton } from "@/components/website/primary-button";
import { ServicesMegaMenu } from "@/components/website/services-mega-menu";
import { WEBSITE_HEADER_NAV } from "@/constants/website-nav";
import { getAlternateLocaleLabel, type WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import type { PublicServicesMenuCategory } from "@/lib/services/service.service";
import { isNavItemActive } from "@/lib/website/paths";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

export function WebsiteHeader({
  locale,
  dictionary,
  logoUrl,
  categories,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  logoUrl?: string | null;
  categories: PublicServicesMenuCategory[];
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const mobilePanelId = useId();
  const megaPanelId = useId();
  const homeHref = localizePath("/", locale);
  const contactHref = localizePath("/contact", locale);
  const otherLocale: SupportedLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="relative sticky top-0 z-50 border-b border-website-border/70 bg-website-surface/95 backdrop-blur-[2px]"
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      <div className="website-container relative">
        <div className="flex h-[4.25rem] items-center gap-4">
          <NavbarLogo logoUrl={logoUrl} href={homeHref} />

          <nav
            className="absolute inset-x-0 hidden justify-center lg:flex"
            aria-label="Main"
          >
            <ul className="flex items-center gap-6 xl:gap-8">
              {WEBSITE_HEADER_NAV.map((item) => {
                const isActive = isNavItemActive(pathname, item.href, item.key);
                const isServices = item.key === "services";

                if (isServices) {
                  return (
                    <li
                      key={item.key}
                      className="relative"
                      onMouseEnter={() => setMegaMenuOpen(true)}
                    >
                      <button
                        type="button"
                        className={cn(
                          "website-body group inline-flex items-center gap-1.5 pb-1 text-base font-medium website-focus-ring",
                          isActive ? "text-website-primary" : "text-website-text hover:text-website-primary",
                        )}
                        aria-expanded={megaMenuOpen}
                        aria-controls={megaPanelId}
                        onClick={() => setMegaMenuOpen((open) => !open)}
                        onFocus={() => setMegaMenuOpen(true)}
                      >
                        {dictionary.nav.services}
                        <Icon
                          icon="lucide:chevron-down"
                          className={cn(
                            "size-4 transition-transform",
                            megaMenuOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "absolute inset-x-0 bottom-0 h-0.5 bg-website-primary transition-opacity",
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                          )}
                          aria-hidden
                        />
                      </button>
                    </li>
                  );
                }

                const href = localizePath(item.href || "/", locale);

                return (
                  <li key={item.key} className="relative">
                    <Link
                      href={href}
                      className={cn(
                        "website-body group inline-block pb-1 text-base font-medium website-focus-ring",
                        isActive ? "text-website-primary" : "text-website-text hover:text-website-primary",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {dictionary.nav[item.key]}
                      <span
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-0.5 bg-website-primary transition-opacity",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        )}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}

              <li>
                <Link
                  href={localizePath(pathname, otherLocale)}
                  className="website-body text-base font-semibold text-website-text hover:text-website-primary website-focus-ring"
                  lang={otherLocale}
                  hrefLang={otherLocale}
                  aria-label={dictionary.actions.switchLanguage}
                >
                  {getAlternateLocaleLabel(locale)}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-3">
            <span className="hidden lg:contents">
              <PrimaryButton href={contactHref}>
                {dictionary.actions.getInTouch}
              </PrimaryButton>
            </span>

            <button
              type="button"
              className="website-focus-ring rounded-sm p-2 text-website-text lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={mobilePanelId}
              aria-label={mobileOpen ? dictionary.actions.closeMenu : dictionary.actions.menu}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon
                icon={mobileOpen ? "lucide:x" : "lucide:menu"}
                className="size-5"
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>

      <ServicesMegaMenu
        locale={locale}
        dictionary={dictionary}
        categories={categories}
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        panelId={megaPanelId}
      />

      <MobileNav
        locale={locale}
        dictionary={dictionary}
        categories={categories}
        contactHref={contactHref}
        logoUrl={logoUrl}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        panelId={mobilePanelId}
      />
    </header>
  );
}
