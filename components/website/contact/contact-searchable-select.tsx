"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export type ContactSelectOption = {
  value: string;
  label: string;
};

export function ContactSearchableSelect({
  value,
  onChange,
  options,
  label,
  placeholder,
  searchPlaceholder,
  error,
  required,
  searchable = true,
}: {
  value: string;
  onChange: (value: string) => void;
  options: ContactSelectOption[];
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  error?: string;
  required?: boolean;
  searchable?: boolean;
}) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedLabel = options.find((option) => option.value === value)?.label ?? "";

  const filtered = useMemo(() => {
    if (!searchable) return options;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query, searchable]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function selectOption(option: ContactSelectOption) {
    onChange(option.value);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={listId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "website-body flex w-full items-center justify-between border-0 border-b-2 bg-transparent px-0 py-2 text-start text-base transition-colors website-focus-ring",
          error ? "border-website-error" : "border-website-input-divider focus:border-website-primary",
          value ? "text-website-text" : "text-website-muted",
        )}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <Icon
          icon="lucide:chevron-down"
          className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-website-border bg-website-surface shadow-lg">
          {searchable && searchPlaceholder ? (
            <div className="border-b border-website-border p-2">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="website-body w-full rounded-md border border-website-border bg-website-bg px-3 py-2 text-sm text-website-text placeholder:text-website-muted website-focus-ring"
              />
            </div>
          ) : null}
          <ul role="listbox" aria-label={label} className="max-h-56 overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((option) => (
                <li key={option.value} role="option" aria-selected={value === option.value}>
                  <button
                    type="button"
                    onClick={() => selectOption(option)}
                    className={cn(
                      "website-body w-full px-3 py-2 text-start text-sm transition-colors hover:bg-website-bg website-focus-ring",
                      value === option.value && "bg-website-bg font-medium text-website-primary",
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="website-body px-3 py-2 text-sm text-website-muted">—</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
