import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/loading";
import type { MapLocationPickerProps } from "@/components/features/map/map-location-picker";

export const MapLocationPicker = dynamic<MapLocationPickerProps>(
  () =>
    import("@/components/features/map/map-location-picker").then(
      (mod) => mod.MapLocationPicker,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-80 items-center justify-center rounded-lg border border-dashboard-border bg-dashboard-bg">
        <Spinner />
      </div>
    ),
  },
);

export { LocationSearch } from "@/components/features/map/location-search";
