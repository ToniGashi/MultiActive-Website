"use client";
/* global google */

import { AdvancedMarker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IPartner } from "./types";

// Simple multilevel clustering
function clusterMarkers(partners: IPartner[], zoom: number) {
  const getClusterDistance = (z: number) =>
    z <= 8
      ? 0.1
      : z <= 10
      ? 0.05
      : z <= 12
      ? 0.01
      : z <= 14
      ? 0.005
      : z <= 16
      ? 0.002
      : 0;

  const d = getClusterDistance(zoom);
  if (d === 0) {
    return partners.map((p) => ({
      type: "single" as const,
      partners: [p],
      position: { lat: p.latitude, lng: p.longitude },
      id: p.id,
    }));
  }

  const clusters: Array<{
    type: "cluster" | "single";
    partners: IPartner[];
    position: { lat: number; lng: number };
    id: string;
  }> = [];
  const used = new Set<string>();

  partners.forEach((p) => {
    if (used.has(p.id)) return;
    const nearby = partners.filter((q) => {
      if (used.has(q.id) || q.id === p.id) return false;
      return Math.hypot(q.latitude - p.latitude, q.longitude - p.longitude) < d;
    });

    if (nearby.length) {
      const all = [p, ...nearby];
      all.forEach((x) => used.add(x.id));
      const lat = all.reduce((s, x) => s + x.latitude, 0) / all.length;
      const lng = all.reduce((s, x) => s + x.longitude, 0) / all.length;
      clusters.push({
        type: "cluster",
        partners: all,
        position: { lat, lng },
        id: `cluster-${all.map((x) => x.id).join("-")}`,
      });
    } else {
      used.add(p.id);
      clusters.push({
        type: "single",
        partners: [p],
        position: { lat: p.latitude, lng: p.longitude },
        id: p.id,
      });
    }
  });

  return clusters;
}

/** Shift map center slightly north of the partner so the InfoWindow (above the pin) and close button stay in view. */
function centerMapForInfoWindow(
  map: google.maps.Map,
  partner: { latitude: number; longitude: number }
) {
  const el = map.getDiv();
  const h = el?.offsetHeight ?? 400;
  const scale = Math.min(1.45, Math.max(0.88, 380 / h));
  const latOffset = 0.00052 * scale;
  map.panTo({
    lat: partner.latitude + latOffset,
    lng: partner.longitude,
  });
}

export const ClusteredPartnerMarkers = ({
  partners,
  selectedPartnerId: externalSelectedPartnerId,
  onPartnerSelect,
}: {
  partners: IPartner[];
  selectedPartnerId?: string | null;
  onPartnerSelect?: (partnerId: string | null) => void;
}) => {
  const [internalSelectedPartnerId, setInternalSelectedPartnerKey] = useState<
    string | null
  >(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoom, setZoom] = useState(10);

  const selectedPartnerId =
    externalSelectedPartnerId !== undefined
      ? externalSelectedPartnerId
      : internalSelectedPartnerId;

  const selectedPartner = useMemo(
    () =>
      partners && selectedPartnerId
        ? partners.find((t) => t.id === selectedPartnerId) ?? null
        : null,
    [partners, selectedPartnerId]
  );

  const map = useMap();

  const setSelectedPartnerKey = useCallback(
    (partnerId: string | null) => {
      if (selectedPartnerId && partnerId && selectedPartnerId !== partnerId) {
        setIsTransitioning(true);
        setTimeout(() => {
          if (onPartnerSelect) {
            onPartnerSelect(partnerId);
          } else {
            setInternalSelectedPartnerKey(partnerId);
          }
          setIsTransitioning(false);
        }, 150);
      } else {
        if (onPartnerSelect) {
          onPartnerSelect(partnerId);
        } else {
          setInternalSelectedPartnerKey(partnerId);
        }
      }
    },
    [selectedPartnerId, onPartnerSelect, setInternalSelectedPartnerKey]
  );

  useEffect(() => {
    if (!map) return;
    const zoomListener = map.addListener("zoom_changed", () =>
      setZoom(map.getZoom() || 10)
    );
    return () => {
      google.maps.event.removeListener(zoomListener);
    };
  }, [map]);

  useEffect(() => {
    if (!map || !selectedPartnerId || externalSelectedPartnerId === undefined)
      return;

    const partner = partners.find((p) => p.id === selectedPartnerId);
    if (!partner) return;

    const timeouts: number[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(window.setTimeout(fn, ms));
    };

    const currentZoom = map.getZoom() || 10;

    if (currentZoom >= 16) {
      const center = map.getCenter();
      if (center) {
        const dist = Math.hypot(
          center.lat() - partner.latitude,
          center.lng() - partner.longitude
        );
        schedule(
          () => centerMapForInfoWindow(map, partner),
          dist < 0.01 ? 200 : 100
        );
      } else {
        centerMapForInfoWindow(map, partner);
      }
    } else {
      centerMapForInfoWindow(map, partner);
    }

    if (currentZoom < 14) {
      schedule(() => map.setZoom(Math.min(currentZoom + 3, 15)), 400);
      schedule(() => map.setZoom(16), 800);
      schedule(() => map.setZoom(17), 1200);
    } else if (currentZoom < 16) {
      schedule(() => map.setZoom(16), 400);
      schedule(() => map.setZoom(17), 800);
    } else if (currentZoom < 17) {
      schedule(() => map.setZoom(17), 400);
    }

    // After zoom animations, re-center so the close control is not clipped at the top edge
    schedule(() => {
      centerMapForInfoWindow(map, partner);
    }, 1380);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [
    map,
    selectedPartnerId,
    externalSelectedPartnerId,
    partners,
    setSelectedPartnerKey,
  ]);

  useEffect(() => {
    if (!selectedPartnerId) return;
    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Element;
      if (!t.closest(".gm-style-iw") && !t.closest(".gm-style-iw-chr")) {
        setSelectedPartnerKey(null);
      }
    };
    const id = setTimeout(
      () => document.addEventListener("click", handleClickOutside),
      100
    );
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedPartnerId, setSelectedPartnerKey]);

  const clusters = useMemo(
    () => clusterMarkers(partners, zoom),
    [partners, zoom]
  );

  const handleInfoWindowClose = useCallback(
    () => setSelectedPartnerKey(null),
    [setSelectedPartnerKey]
  );
  const handleMarkerClick = useCallback(
    (id: string) => setSelectedPartnerKey(id),
    [setSelectedPartnerKey]
  );

  const handleClusterClick = useCallback(
    (cluster: { type: string; position: google.maps.LatLngLiteral }) => {
      if (!map || cluster.type !== "cluster") return;
      const currentZoom = map.getZoom() || 10;
      let targetZoom = currentZoom + 2;
      if (currentZoom <= 8) targetZoom = 10;
      else if (currentZoom <= 10) targetZoom = 12;
      else if (currentZoom <= 12) targetZoom = 14;
      else if (currentZoom <= 14) targetZoom = 16;
      else targetZoom = Math.min(currentZoom + 1, 18);
      map.panTo(cluster.position);
      setTimeout(() => map.setZoom(targetZoom), 350);
    },
    [map]
  );

  const imgSrc = useMemo(
    () => selectedPartner?.mainImage ?? "/placeholder.png",
    [selectedPartner?.mainImage]
  );

  return (
    <>
      {clusters.map((cluster) => (
        <AdvancedMarker
          key={cluster.id}
          position={cluster.position}
          onClick={() => {
            if (cluster.type === "cluster") handleClusterClick(cluster);
            else handleMarkerClick(cluster.partners[0].id);
          }}
        >
          {cluster.type === "cluster" ? (
            <div className="relative">
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white/15 bg-zinc-900 shadow-[0_0_24px_-6px_rgba(59,130,246,0.45)] ring-2 ring-primary/35 transition-transform duration-200 hover:scale-110">
                <span className="text-lg font-bold text-white">
                  {cluster.partners.length}
                </span>
              </div>
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/25 opacity-30" />
            </div>
          ) : (
            <div className="relative">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white/15 bg-zinc-900 shadow-[0_0_16px_-4px_rgba(59,130,246,0.4)] ring-2 ring-primary/30 transition-transform duration-200 hover:scale-110">
                <svg
                  className="h-4 w-4 text-sky-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full bg-primary/25 opacity-30" />
            </div>
          )}
        </AdvancedMarker>
      ))}

      {selectedPartnerId && selectedPartner && !isTransitioning && (
        <InfoWindow
          position={{
            lat: selectedPartner.latitude,
            lng: selectedPartner.longitude,
          }}
          onCloseClick={handleInfoWindowClose}
          /* Slightly less upward shift so the header + close control fit in the map frame */
          pixelOffset={[0, -12]}
          shouldFocus={false}
          disableAutoPan
        >
          <div className="box-border w-48 max-w-[80vw] overflow-hidden rounded-md border border-white/10 bg-zinc-950 bg-gradient-to-b from-zinc-900 to-zinc-950 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)] sm:w-56 sm:rounded-lg md:w-64">
            {/* Header — solid layers (no /opacity) so the map never shows through */}
            <div className="border-b border-white/10 bg-zinc-900 p-2 sm:p-2.5 md:p-3">
              <div className="mb-1 flex items-center gap-1 sm:mb-1.5 sm:gap-1.5 md:mb-2 md:gap-2">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-primary/15 sm:h-6 sm:w-6 md:h-8 md:w-8 md:rounded-lg">
                  <svg
                    className="h-2.5 w-2.5 text-sky-300 sm:h-3 sm:w-3 md:h-4 md:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs font-bold text-white sm:text-sm md:text-base">
                    {selectedPartner?.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-0.5 text-xs text-zinc-400 sm:gap-1">
                  <svg
                    className="h-2 w-2 flex-shrink-0 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate text-xs">
                    {selectedPartner?.city}
                  </span>
                </div>

                <div className="flex flex-shrink-0 items-center gap-0.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[0.65rem] font-medium text-emerald-300 sm:px-2 sm:text-xs">
                  <div className="h-1 w-1 animate-pulse rounded-full bg-emerald-400 sm:h-1.5 sm:w-1.5" />
                  <span>Open</span>
                </div>
              </div>
            </div>

            {/* Image with solid ratio box (16:9) */}
            <div className="bg-zinc-950 px-2 pb-2 pt-0 sm:px-2.5 sm:pb-2.5 md:px-3 md:pb-3">
              <div className="relative w-full overflow-hidden rounded-md border border-white/10 bg-zinc-900">
                {/* 16:9 ratio box */}
                <div className="h-0 w-full pb-[56.25%]" />
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                  style={{
                    backgroundImage: `url('${imgSrc || "/placeholder.png"}')`,
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="overflow-hidden border-t border-white/10 bg-zinc-950 p-1.5 sm:p-2 md:p-3">
              <p className="mb-1.5 line-clamp-2 break-words text-xs leading-relaxed text-zinc-300">
                {selectedPartner?.description}
              </p>
              <a
                href={`/partners/${selectedPartner?.id}`}
                className="block w-full whitespace-nowrap rounded-md border border-primary/30 bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_rgba(59,130,246,0.55)] transition-colors hover:bg-primary/90"
              >
                Shiko më shumë
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
