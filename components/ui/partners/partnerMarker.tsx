"use client";
/* global google */

import { AdvancedMarker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IPartner } from "./types";

const PLACEHOLDER_DATA_URI =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop stop-color='#e5e7eb' offset='0'/><stop stop-color='#d1d5db' offset='1'/>
      </linearGradient></defs>
      <rect width='400' height='225' fill='url(#g)'/>
      <g fill='#9ca3af'><circle cx='60' cy='60' r='30'/><rect x='140' y='80' width='160' height='80' rx='8'/></g>
    </svg>`
  );

function normalizeImageUrl(raw?: string | null): string | null {
  if (!raw) return null;
  let url = raw.trim();
  if (!url) return null;

  // Fix protocol-relative URLs: //cdn.example.com/...
  if (url.startsWith("//")) url = "https:" + url;

  // Encode spaces
  url = url.replace(/\s/g, "%20");

  // Resolve relative paths
  if (url.startsWith("/")) {
    try {
      url = new URL(
        url,
        typeof window !== "undefined"
          ? window.location.origin
          : "https://localhost"
      ).toString();
    } catch {
      return null;
    }
  }

  // If page is HTTPS and image is HTTP, most browsers block it (mixed content).
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("http://")
  ) {
    console.warn(
      "[PartnerMarkers] Mixed content: refusing http image on https page.",
      { original: raw }
    );
    return null; // will show placeholder unless you proxy it
  }

  return url;
}

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

  const setSelectedPartnerKey = (partnerId: string | null) => {
    if (selectedPartnerId && partnerId && selectedPartnerId !== partnerId) {
      setIsTransitioning(true);
      setTimeout(() => {
        onPartnerSelect
          ? onPartnerSelect(partnerId)
          : setInternalSelectedPartnerKey(partnerId);
        setIsTransitioning(false);
      }, 150);
    } else {
      onPartnerSelect
        ? onPartnerSelect(partnerId)
        : setInternalSelectedPartnerKey(partnerId);
    }
  };

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

    const currentZoom = map.getZoom() || 10;
    const target = { lat: partner.latitude, lng: partner.longitude };

    if (currentZoom >= 16) {
      const center = map.getCenter();
      if (center) {
        const dist = Math.hypot(
          center.lat() - target.lat,
          center.lng() - target.lng
        );
        setTimeout(() => map.panTo(target), dist < 0.01 ? 200 : 100);
      } else {
        map.panTo(target);
      }
    } else {
      map.panTo(target);
    }

    if (currentZoom < 14) {
      setTimeout(() => map.setZoom(Math.min(currentZoom + 3, 15)), 400);
      setTimeout(() => map.setZoom(16), 800);
      setTimeout(() => map.setZoom(17), 1200);
    } else if (currentZoom < 16) {
      setTimeout(() => map.setZoom(16), 400);
      setTimeout(() => map.setZoom(17), 800);
    } else if (currentZoom < 17) {
      setTimeout(() => map.setZoom(17), 400);
    }
  }, [map, selectedPartnerId, externalSelectedPartnerId, partners]);

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
  }, [selectedPartnerId]);

  const clusters = useMemo(
    () => clusterMarkers(partners, zoom),
    [partners, zoom]
  );

  const handleInfoWindowClose = useCallback(
    () => setSelectedPartnerKey(null),
    []
  );
  const handleMarkerClick = useCallback(
    (id: string) => setSelectedPartnerKey(id),
    []
  );

  const handleClusterClick = useCallback(
    (cluster: any) => {
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
  function normalizeImageUrl(raw?: string | null): string | null {
    if (!raw) return null;
    const clean = raw.split("?")[0];
    const i = clean.indexOf("/fitness/");
    if (i !== -1) return clean.slice(i); // → "/fitness/whatever.jpg"

    // fallback: last filename under /fitness
    const segs = clean.split("/").filter(Boolean);
    const last = segs.pop();
    return last ? `/fitness/${last}` : null;
  }
  const imgSrc = useMemo(
    () => normalizeImageUrl(selectedPartner?.mainImage) ?? "/placeholder.png",
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
              <div className="w-12 h-12 bg-blue-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-lg">
                  {cluster.partners.length}
                </span>
              </div>
              <div className="absolute inset-0 w-12 h-12 bg-blue-600 rounded-full animate-ping opacity-20" />
            </div>
          ) : (
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer">
                <svg
                  className="w-4 h-4 text-white"
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
              <div className="absolute inset-0 w-8 h-8 bg-blue-600 rounded-full animate-ping opacity-20" />
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
          pixelOffset={[0, -30]}
        >
          <div className="w-48 sm:w-56 md:w-64 max-w-[80vw] bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-md sm:rounded-lg overflow-hidden shadow-lg box-border">
            {/* Header */}
            <div className="p-2 sm:p-2.5 md:p-3">
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white/20 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white"
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
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-white truncate">
                    {selectedPartner?.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 sm:gap-1 text-white/80 text-xs">
                  <svg
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0"
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

                <div className="flex items-center gap-0.5 sm:gap-1 bg-green-400/20 text-green-100 px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full text-xs">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-xs">Open</span>
                </div>
              </div>
            </div>

            {/* Image with solid ratio box (16:9) */}
            <div className="px-2 sm:px-2.5 md:px-3 pb-1.5 sm:pb-2 md:pb-3">
              <div className="relative w-full overflow-hidden rounded sm:rounded-md bg-gray-100">
                {/* 16:9 ratio box */}
                <div className="w-full h-0 pb-[56.25%]" />
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                  style={{
                    backgroundImage: `url('${imgSrc || "/placeholder.png"}')`,
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="bg-white text-gray-800 p-1.5 sm:p-2 md:p-3 overflow-hidden">
              <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2 break-words">
                {selectedPartner?.description}
              </p>
              <a
                href={`/partners/${selectedPartner?.id}`}
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-1.5 px-1.5 rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium text-xs whitespace-nowrap"
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
