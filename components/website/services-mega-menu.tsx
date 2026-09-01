"use client";

import { Icon } from "@iconify/react";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicServicesMenuCategory } from "@/lib/services/service.service";
import { getServiceCategoryPath, getServiceDetailPath } from "@/lib/website/paths";
import { splitIntoThreeColumns } from "@/lib/website/split-columns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const MEGA_MENU_MUTED = "text-[#686C70]";
const SERVICES_PER_COLUMN = 5;

const CATEGORY_ACCENTS = [
  "bg-website-icon-bg text-website-primary ring-website-border",
  "bg-website-bg text-website-secondary ring-website-border",
] as const;

export function ServicesMegaMenu({
  locale,
  dictionary,
  categories,
  isOpen,
  onClose,
  panelId,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  categories: PublicServicesMenuCategory[];
  isOpen: boolean;
  onClose: () => void;
  panelId: string;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.id ?? null,
  );
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categories.length === 0) {
      setActiveCategoryId(null);
      return;
    }

    setActiveCategoryId((current) => {
      if (current && categories.some((category) => category.id === current)) {
        return current;
      }
      return categories[0]!.id;
    });
  }, [categories]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  const serviceColumns = splitIntoThreeColumns(
    activeCategory?.services ?? [],
    SERVICES_PER_COLUMN,
  );

  if (!isOpen) return null;

  const activeCategoryName = activeCategory
    ? pickLocalizedField(activeCategory, "name", locale)
    : "";

  return (
    <div
      ref={panelRef}
      id={panelId}
      role="region"
      aria-label={dictionary.nav.services}
      className="mega-menu-panel-in absolute inset-x-0 top-full z-40 w-full rounded-none rounded-b-xl border border-t border-website-border bg-website-surface shadow-md"
    >
      <div className="website-container py-5 lg:py-6">
        {categories.length === 0 ? (
          <p className={cn("website-body text-sm", MEGA_MENU_MUTED)}>
            {dictionary.actions.noServiceCategories}
          </p>
        ) : (
          <div className="grid min-h-[16rem] lg:grid-cols-[minmax(13rem,16rem)_1fr]">
            <nav
              className="border-b border-website-border p-3 sm:p-4 lg:border-b-0 lg:border-e lg:pe-6 lg:py-1"
              aria-label={dictionary.nav.services}
            >
              <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                {categories.map((category, index) => {
                  const isActive = category.id === activeCategory?.id;
                  const name = pickLocalizedField(category, "name", locale);
                  const accent = CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length]!;

                  return (
                    <li key={category.id} className="shrink-0 lg:shrink">
                      <Link
                        href={getServiceCategoryPath(category.slug, locale)}
                        className={cn(
                          "website-body flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-start text-sm transition-colors duration-200 website-focus-ring lg:gap-3 lg:py-3",
                          isActive
                            ? "bg-website-icon-bg font-medium text-website-text"
                            : cn(MEGA_MENU_MUTED, "hover:bg-website-bg"),
                        )}
                        aria-current={isActive ? "true" : undefined}
                        onMouseEnter={() => setActiveCategoryId(category.id)}
                        onFocus={() => setActiveCategoryId(category.id)}
                        onClick={onClose}
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full ring-1 transition-transform duration-200",
                            isActive
                              ? cn(accent, "scale-105")
                              : "bg-website-surface text-website-primary ring-website-border",
                          )}
                        >
                          <Icon
                            icon={category.icon || "lucide:sparkles"}
                            className="size-3.5"
                            aria-hidden
                          />
                        </span>
                        <span className="min-w-0 leading-snug">{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex min-w-0 flex-col py-1 lg:ps-8 lg:pe-2">
              {activeCategory && activeCategory.services.length > 0 ? (
                <div key={activeCategory.id} className="mega-menu-content-in flex min-h-0 flex-1 flex-col">
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-dashed border-website-border pb-4">
                    <div className="min-w-0">
                      <p className="website-body text-xs font-semibold tracking-wide text-website-primary">
                        {dictionary.nav.services}
                      </p>
                      <h3 className="website-heading mt-1 text-lg font-bold text-website-text sm:text-xl">
                        <Link
                          href={getServiceCategoryPath(activeCategory.slug, locale)}
                          className="transition-colors hover:text-website-primary website-focus-ring rounded-sm"
                          onClick={onClose}
                        >
                          {activeCategoryName}
                        </Link>
                      </h3>
                    </div>
                    <span className="website-body inline-flex items-center gap-1.5 rounded-full bg-website-icon-bg px-3 py-1 text-xs font-medium text-website-primary">
                      <Icon icon="lucide:layers" className="size-3.5" aria-hidden />
                      {activeCategory.services.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-16">
                    {serviceColumns.map((columnServices, columnIndex) => (
                      <ServiceColumn
                        key={columnIndex}
                        locale={locale}
                        services={columnServices}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mega-menu-content-in flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-website-icon-bg text-website-primary">
                    <Icon icon="lucide:folder-open" className="size-5" aria-hidden />
                  </span>
                  <p className={cn("website-body max-w-xs text-sm", MEGA_MENU_MUTED)}>
                    {dictionary.actions.noServicesInCategory}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceColumn({
  locale,
  services,
}: {
  locale: SupportedLocale;
  services: PublicServicesMenuCategory["services"];
}) {
  return (
    <ul className="grid grid-rows-5 gap-0.5" role="list">
      {Array.from({ length: SERVICES_PER_COLUMN }, (_, rowIndex) => {
        const service = services[rowIndex];
        if (!service) {
          return <li key={`empty-${rowIndex}`} className="hidden lg:block" aria-hidden />;
        }

        return (
          <li key={service.id}>
            <Link
              href={getServiceDetailPath(service.slug, locale)}
              className="mega-menu-service-link group flex h-10 items-center gap-2 rounded-xl py-2 pe-1 ps-1 text-sm transition-colors website-focus-ring"
            >
              <span
                className="size-1.5 shrink-0 rounded-full bg-website-secondary opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <span
                className={cn(
                  "min-w-0 flex-1 leading-snug transition-colors",
                  MEGA_MENU_MUTED,
                  "group-hover:text-website-primary",
                )}
              >
                {pickLocalizedField(service, "name", locale)}
              </span>
              <span className="mega-menu-service-arrow flex size-7 shrink-0 items-center justify-center rounded-full bg-website-bg text-website-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
                <Icon
                  icon="lucide:arrow-right"
                  className="size-3.5 rtl:rotate-180"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MobileServicesSection({
  locale,
  dictionary,
  categories,
  onNavigate,
}: {
  locale: SupportedLocale;
  dictionary: WebsiteDictionary;
  categories: PublicServicesMenuCategory[];
  onNavigate: () => void;
}) {
  const sectionId = useId();
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryId((current) => (current === categoryId ? null : categoryId));
  };

  return (
    <li>
      <button
        type="button"
        className="website-body flex w-full items-center justify-between py-2.5 text-sm font-medium text-website-text website-focus-ring"
        aria-expanded={servicesExpanded}
        aria-controls={sectionId}
        onClick={() => setServicesExpanded((open) => !open)}
      >
        {dictionary.nav.services}
        <Icon
          icon="lucide:chevron-down"
          className={cn("size-4 transition-transform", servicesExpanded && "rotate-180")}
          aria-hidden
        />
      </button>

      {servicesExpanded && (
        <div id={sectionId} className="pb-2 ps-3">
          {categories.length === 0 ? (
            <p className="website-body py-2 text-sm text-website-muted">
              {dictionary.actions.noServiceCategories}
            </p>
          ) : (
            <ul className="space-y-0.5 border-s-2 border-website-border ps-3" role="list">
              {categories.map((category) => {
                const isExpanded = expandedCategoryId === category.id;
                const categorySubmenuId = `${sectionId}-category-${category.id}`;

                return (
                  <li key={category.id}>
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={getServiceCategoryPath(category.slug, locale)}
                        className={cn(
                          "website-body min-w-0 flex-1 py-2 text-start text-sm website-focus-ring",
                          isExpanded
                            ? "font-semibold text-website-primary"
                            : "text-website-muted hover:text-website-primary",
                        )}
                        onClick={onNavigate}
                      >
                        {pickLocalizedField(category, "name", locale)}
                      </Link>
                      <button
                        type="button"
                        className="website-body flex size-8 shrink-0 items-center justify-center rounded-md text-website-muted website-focus-ring hover:text-website-primary"
                        aria-expanded={isExpanded}
                        aria-controls={categorySubmenuId}
                        aria-label={pickLocalizedField(category, "name", locale)}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <Icon
                          icon="lucide:chevron-down"
                          className={cn(
                            "size-3.5 shrink-0 transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <ul
                        id={categorySubmenuId}
                        className="mobile-submenu-in space-y-1 pb-2 ps-3"
                        role="list"
                      >
                        {category.services.length === 0 ? (
                          <li>
                            <span className="website-body block py-1.5 text-sm text-website-muted">
                              {dictionary.actions.noServicesInCategory}
                            </span>
                          </li>
                        ) : (
                          category.services.map((service) => (
                            <li key={service.id}>
                              <Link
                                href={getServiceDetailPath(service.slug, locale)}
                                className="website-body block py-1.5 text-sm text-website-muted hover:text-website-primary website-focus-ring"
                                onClick={onNavigate}
                              >
                                {pickLocalizedField(service, "name", locale)}
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
