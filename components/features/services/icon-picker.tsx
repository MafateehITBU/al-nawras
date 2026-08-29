"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const POPULAR_ICONS = [
  "mdi:shield-check",
  "mdi:lightbulb-on",
  "mdi:scale-balance",
  "mdi:file-document",
  "mdi:globe-model",
  "mdi:handshake",
  "mdi:chart-line",
  "mdi:account-group",
  "mdi:briefcase",
  "mdi:certificate",
  "mdi:gavel",
  "mdi:target",
];

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (icon: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>(POPULAR_ICONS);

  useEffect(() => {
    if (!query.trim()) {
      setResults(POPULAR_ICONS);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.iconify.design/search?query=${encodeURIComponent(query.trim())}&limit=24`,
        );
        const data = (await res.json()) as { icons?: string[] };
        setResults(data.icons?.length ? data.icons : POPULAR_ICONS);
      } catch {
        setResults(POPULAR_ICONS);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons…"
        />
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-dashboard-text-muted" />
      </div>

      {value && (
        <div className="flex items-center gap-2 rounded-lg border border-dashboard-border px-3 py-2 text-sm">
          <Icon icon={value} className="size-6 text-dashboard-primary" />
          <span className="text-dashboard-text-muted">{value}</span>
        </div>
      )}

      <div className="grid max-h-48 grid-cols-6 gap-2 overflow-y-auto rounded-lg border border-dashboard-border p-2">
        {results.map((icon) => (
          <button
            key={icon}
            type="button"
            title={icon}
            onClick={() => onChange(icon)}
            className={cn(
              "flex aspect-square items-center justify-center rounded-md border transition-colors focus-ring",
              value === icon
                ? "border-dashboard-primary bg-dashboard-primary/10"
                : "border-transparent hover:bg-dashboard-bg",
            )}
          >
            <Icon icon={icon} className="size-6 text-dashboard-text" />
          </button>
        ))}
      </div>
    </div>
  );
}
