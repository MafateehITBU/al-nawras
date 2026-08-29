"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

const DEFAULT_CENTER: [number, number] = [24.7136, 46.6753];

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const TILE_URL = "/api/map-tiles/{z}/{x}/{y}";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export interface MapLocationPickerProps {
  latitude: number;
  longitude: number;
  onChange: (coords: { latitude: number; longitude: number }) => void;
  height?: string;
  readOnly?: boolean;
  /** Change when the map container becomes visible (e.g. modal open) */
  invalidateKey?: string | number;
}

export function MapLocationPicker({
  latitude,
  longitude,
  onChange,
  height = "320px",
  readOnly = false,
  invalidateKey,
}: MapLocationPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onChangeRef = useRef(onChange);

  const lat = Number.isFinite(latitude) ? latitude : DEFAULT_CENTER[0];
  const lng = Number.isFinite(longitude) ? longitude : DEFAULT_CENTER[1];

  onChangeRef.current = onChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = L.map(container, {
      scrollWheelZoom: !readOnly,
      dragging: !readOnly,
      doubleClickZoom: !readOnly,
      touchZoom: !readOnly,
      zoomControl: true,
    }).setView([lat, lng], 13);

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([lat, lng], {
      icon: markerIcon,
      draggable: !readOnly,
    }).addTo(map);

    if (!readOnly) {
      map.on("click", (event) => {
        marker.setLatLng(event.latlng);
        onChangeRef.current({
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        });
      });

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        onChangeRef.current({
          latitude: pos.lat,
          longitude: pos.lng,
        });
      });
    }

    mapRef.current = map;
    markerRef.current = marker;

    const refresh = () => map.invalidateSize();
    const timer = window.setTimeout(refresh, 0);
    const timer2 = window.setTimeout(refresh, 250);

    const observer = new ResizeObserver(refresh);
    observer.observe(container);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(timer2);
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [readOnly, invalidateKey]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], map.getZoom(), { animate: false });
  }, [latitude, longitude]);

  return (
    <div
      className="shrink-0 overflow-hidden rounded-lg border border-dashboard-border"
      style={{ height, minHeight: height }}
    >
      <div
        ref={containerRef}
        className="leaflet-map"
        style={{ height, width: "100%" }}
      />
    </div>
  );
}
