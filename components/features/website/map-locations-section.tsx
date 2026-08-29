"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { SectionHeader } from "@/components/ui/page-header";
import { useDeleteConfirm } from "@/components/providers/confirm-dialog-provider";
import { MapLocationPicker, LocationSearch } from "@/components/features/map";
import { toNumber } from "@/components/features/website/types";
import { apiClient } from "@/lib/api/client";
import { notify } from "@/lib/utils/notify";
import type { WebsiteMapLocation } from "@prisma/client";
import { ExternalLink, MapPinned, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface MapFormState {
  latitude: number;
  longitude: number;
  label: string;
}

const DEFAULT_COORDS = { latitude: 24.7136, longitude: 46.6753 };

const emptyForm = (): MapFormState => ({
  ...DEFAULT_COORDS,
  label: "",
});

function formatCoords(lat: number, lng: number) {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

function osmLink(lat: number, lng: number) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
}

export function MapLocationsSection({
  mapLocations,
  onChange,
}: {
  mapLocations: WebsiteMapLocation[];
  onChange: (locations: WebsiteMapLocation[]) => void;
}) {
  const confirmDelete = useDeleteConfirm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WebsiteMapLocation | null>(null);
  const [form, setForm] = useState<MapFormState>(emptyForm());
  const [loading, setLoading] = useState(false);
  const reverseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labelManuallyEdited = useRef(false);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const result = await apiClient<{ label: string | null }>(
        `/api/admin/geocode/reverse?lat=${lat}&lon=${lng}`,
      );
      if (result.label && !labelManuallyEdited.current) {
        setForm((prev) => ({ ...prev, label: result.label ?? prev.label }));
      }
    } catch {
      // Reverse geocoding is best-effort
    }
  }, []);

  function scheduleReverseGeocode(lat: number, lng: number) {
    if (reverseTimer.current) clearTimeout(reverseTimer.current);
    reverseTimer.current = setTimeout(() => {
      void reverseGeocode(lat, lng);
    }, 600);
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm());
    labelManuallyEdited.current = false;
    setModalOpen(true);
  }

  function openEdit(location: WebsiteMapLocation) {
    setEditing(location);
    setForm({
      latitude: toNumber(location.latitude),
      longitude: toNumber(location.longitude),
      label: location.label ?? "",
    });
    labelManuallyEdited.current = Boolean(location.label);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm());
    labelManuallyEdited.current = false;
    if (reverseTimer.current) clearTimeout(reverseTimer.current);
  }

  useEffect(() => {
    return () => {
      if (reverseTimer.current) clearTimeout(reverseTimer.current);
    };
  }, []);

  function handleCoordsChange(coords: { latitude: number; longitude: number }) {
    setForm((prev) => ({ ...prev, ...coords }));
    scheduleReverseGeocode(coords.latitude, coords.longitude);
  }

  function handleSearchSelect(result: {
    latitude: number;
    longitude: number;
    label: string;
  }) {
    labelManuallyEdited.current = false;
    setForm((prev) => ({
      ...prev,
      latitude: result.latitude,
      longitude: result.longitude,
      label: result.label,
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const body = {
        latitude: form.latitude,
        longitude: form.longitude,
        label: form.label.trim() || null,
      };

      if (editing) {
        const updated = await apiClient<WebsiteMapLocation>(
          `/api/admin/website/map-locations/${editing.id}`,
          { method: "PATCH", body },
        );
        onChange(mapLocations.map((l) => (l.id === updated.id ? updated : l)));
        notify.success("Map location updated");
      } else {
        const created = await apiClient<WebsiteMapLocation>(
          "/api/admin/website/map-locations",
          { method: "POST", body },
        );
        onChange([...mapLocations, created]);
        notify.success("Map location added");
      }
      closeModal();
    } catch (error) {
      notify.fromError(error, "Failed to save map location");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(location: WebsiteMapLocation) {
    const confirmed = await confirmDelete(
      location.label ? `"${location.label}" map pin` : "this map location",
    );
    if (!confirmed) return;

    try {
      await apiClient(`/api/admin/website/map-locations/${location.id}`, {
        method: "DELETE",
      });
      onChange(mapLocations.filter((l) => l.id !== location.id));
      notify.success("Map location deleted");
    } catch (error) {
      notify.fromError(error, "Failed to delete map location");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <SectionHeader
            title="Map locations"
            description="Pins shown on the contact map using OpenStreetMap."
            actions={
              <Button size="sm" onClick={openCreate}>
                <Plus className="size-4" />
                Add location
              </Button>
            }
          />
        </CardHeader>
        <CardContent>
          {mapLocations.length === 0 ? (
            <EmptyState
              icon={MapPinned}
              title="No map locations"
              description="Add office pins so visitors can find you on the map."
              actionLabel="Add location"
              onAction={openCreate}
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {mapLocations.map((location) => {
                const lat = toNumber(location.latitude);
                const lng = toNumber(location.longitude);

                return (
                  <div
                    key={location.id}
                    className="overflow-hidden rounded-lg border border-dashboard-border"
                  >
                    <MapLocationPicker
                      key={location.id}
                      invalidateKey={location.id}
                      latitude={lat}
                      longitude={lng}
                      onChange={() => {}}
                      height="180px"
                      readOnly
                    />
                    <div className="flex items-start justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="font-medium text-dashboard-text">
                          {location.label || "Untitled location"}
                        </p>
                        <p className="mt-1 text-sm text-dashboard-text-muted">
                          {formatCoords(lat, lng)}
                        </p>
                        <a
                          href={osmLink(lat, lng)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs text-dashboard-primary hover:underline"
                        >
                          View on OpenStreetMap
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit map location"
                          onClick={() => openEdit(location)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete map location"
                          onClick={() => handleDelete(location)}
                        >
                          <Trash2 className="size-4 text-dashboard-error" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit map location" : "Add map location"}
        description="Search for a place or click/drag the pin on the map."
        size="md"
        footer={
          <ModalFooter
            onCancel={closeModal}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel={editing ? "Update" : "Add"}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <LocationSearch
            key={editing?.id ?? "new"}
            defaultQuery={form.label}
            onSelect={handleSearchSelect}
          />
          {modalOpen && (
            <div className="shrink-0">
              <MapLocationPicker
                key={editing?.id ?? "new"}
                invalidateKey={editing?.id ?? "new"}
                latitude={form.latitude}
                longitude={form.longitude}
                onChange={handleCoordsChange}
                height="240px"
              />
            </div>
          )}
          <FormField
            label="Label"
            htmlFor="mapLabel"
            hint="Auto-filled from search — edit if needed"
          >
            <Input
              id="mapLabel"
              value={form.label}
              onChange={(e) => {
                labelManuallyEdited.current = true;
                setForm({ ...form, label: e.target.value });
              }}
              placeholder="Head office"
            />
          </FormField>
        </div>
      </Modal>
    </>
  );
}
