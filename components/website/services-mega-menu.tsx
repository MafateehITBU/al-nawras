"use client";

import { Icon } from "@iconify/react";
import { pickLocalizedField } from "@/lib/i18n/content";
import type { WebsiteDictionary } from "@/lib/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicServicesMenuCategory } from "@/lib/services/service.service";
import { getServiceDetailPath } from "@/lib/website/paths";
import { splitIntoColumns } from "@/lib/website/split-columns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

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

  const [leftServices, rightServices] = splitIntoColumns(
    activeCategory?.services ?? [],
    5,
  );

  const handleCategoryKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, categoryId: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveCategoryId(categoryId);
      }
    },
    [],
  );

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      id={panelId}
      role="region"
      aria-label={dictionary.nav.services}
      className="absolute inset-x-0 top-full z-40 w-full border-t border-website-border bg-website-surface shadow-sm"
    >
      <div className="website-container py-6">
        {categories.length === 0 ? (
          <p className="website-body text-sm text-website-muted">
            {dictionary.actions.noServiceCategories}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(12rem,16rem)_1fr_1fr] lg:gap-0">
            <div className="lg:border-e lg:border-website-border lg:pe-6">
              <ul className="space-y-1" role="list">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory?.id;
                  const name = pickLocalizedField(category, "name", locale);

                  return (
                    <li key={category.id}>
                      <button
                        type="button"
                        className={cn(
                          "website-body flex w-full items-center justify-between gap-3 rounded-sm px-2 py-2.5 text-start text-base transition-colors website-focus-ring",
                          isActive
                            ? "font-semibold text-website-text"
                            : "text-website-muted hover:text-website-text",
                        )}
                        aria-current={isActive ? "true" : undefined}
                        onMouseEnter={() => setActiveCategoryId(category.id)}
                        onFocus={() => setActiveCategoryId(category.id)}
                        onClick={() => setActiveCategoryId(category.id)}
                        onKeyDown={(event) => handleCategoryKeyDown(event, category.id)}
                      >
                        <span>{name}</span>
                        <Icon
                          icon="lucide:chevron-right"
                          className={cn(
                            "size-4 shrink-0 text-website-muted website-ltr-icon rtl:rotate-180",
                            isActive && "text-website-text",
                          )}
                          aria-hidden
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ServiceColumn
              locale={locale}
              services={leftServices}
              emptyMessage={dictionary.actions.noServicesInCategory}
              className="lg:border-e lg:border-website-border lg:px-6"
            />

            <ServiceColumn
              locale={locale}
              services={rightServices}
              emptyMessage={null}
              className="lg:ps-6"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceColumn({
  locale,
  services,
  emptyMessage,
  className,
}: {
  locale: SupportedLocale;
  services: PublicServicesMenuCategory["services"];
  emptyMessage: string | null;
  className?: string;
}) {
  if (services.length === 0 && emptyMessage) {
    return (
      <div className={className}>
        <p className="website-body text-sm text-website-muted">{emptyMessage}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return <div className={className} aria-hidden />;
  }

  return (
    <ul className={cn("space-y-3", className)} role="list">
      {services.map((service) => (
        <li key={service.id}>
          <Link
            href={getServiceDetailPath(service.slug, locale)}
            className="website-body block text-base text-website-muted transition-colors hover:text-website-primary website-focus-ring rounded-sm"
          >
            {pickLocalizedField(service, "name", locale)}
          </Link>
        </li>
      ))}
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
  const [expanded, setExpanded] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  return (
    <li>
      <button
        type="button"
        className="website-body flex w-full items-center justify-between py-2.5 text-sm font-medium text-website-text website-focus-ring"
        aria-expanded={expanded}
        aria-controls={sectionId}
        onClick={() => setExpanded((open) => !open)}
      >
        {dictionary.nav.services}
        <Icon
          icon="lucide:chevron-down"
          className={cn("size-4 transition-transform", expanded && "rotate-180")}
          aria-hidden
        />
      </button>

      {expanded && (
        <div id={sectionId} className="pb-2 ps-3">
          {categories.length === 0 ? (
            <p className="website-body py-2 text-sm text-website-muted">
              {dictionary.actions.noServiceCategories}
            </p>
          ) : (
            <>
              <ul className="space-y-1 border-s-2 border-website-border ps-3" role="list">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory?.id;
                  return (
                    <li key={category.id}>
                      <button
                        type="button"
                        className={cn(
                          "website-body w-full py-2 text-start text-sm website-focus-ring",
                          isActive
                            ? "font-semibold text-website-primary"
                            : "text-website-muted",
                        )}
                        onClick={() => setActiveCategoryId(category.id)}
                      >
                        {pickLocalizedField(category, "name", locale)}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {activeCategory && activeCategory.services.length > 0 && (
                <ul className="mt-2 space-y-2 ps-3" role="list">
                  {activeCategory.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={getServiceDetailPath(service.slug, locale)}
                        className="website-body block py-1.5 text-sm text-website-muted hover:text-website-primary website-focus-ring"
                        onClick={onNavigate}
                      >
                        {pickLocalizedField(service, "name", locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}
