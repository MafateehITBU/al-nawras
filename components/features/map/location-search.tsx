"use client";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/loading";
import { apiClient } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import { MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface GeocodeResult {
  placeId: number;
  latitude: number;
  longitude: number;
  label: string;
}

export function LocationSearch({
  onSelect,
  defaultQuery = "",
}: {
  onSelect: (result: GeocodeResult) => void;
  defaultQuery?: string;
}) {
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (value: string) => {
    if (value.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    try {
      const data = await apiClient<GeocodeResult[]>(
        `/api/admin/geocode/search?q=${encodeURIComponent(value.trim())}`,
      );
      setResults(data);
      setSearched(true);
    } catch (error) {
      notify.fromError(error, "Location search failed");
      setResults([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void search(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location…"
          aria-label="Search location"
          aria-expanded={results.length > 0}
          aria-controls="location-search-results"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner className="size-4" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <ul
          id="location-search-results"
          className="max-h-36 overflow-y-auto rounded-lg border border-dashboard-border bg-dashboard-surface shadow-sm"
          role="listbox"
        >
          {results.map((result) => (
            <li key={result.placeId}>
              <button
                type="button"
                role="option"
                className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm hover:bg-dashboard-bg focus:bg-dashboard-bg focus-ring"
                onClick={() => {
                  onSelect(result);
                  setQuery(result.label);
                  setResults([]);
                  setSearched(false);
                }}
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-dashboard-primary" />
                <span className="text-dashboard-text">{result.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {searched && !loading && results.length === 0 && query.trim().length >= 2 && (
        <p className="rounded-lg border border-dashboard-border bg-dashboard-bg px-3 py-2 text-sm text-dashboard-text-muted">
          No locations found. Try a different search.
        </p>
      )}
    </div>
  );
}
