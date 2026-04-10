"use client";

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

import { APIProvider, Map, MapMouseEvent } from "@vis.gl/react-google-maps";
import { IPartner } from "./types";
import { ClusteredPartnerMarkers } from "./partnerMarker";
import { useCallback, useEffect, useState } from "react";

const MAPS_BILLING_DOC =
  "https://developers.google.com/maps/documentation/javascript/error-messages#billing-not-enabled-map-error";

interface PartnerMapProps {
  partners: IPartner[];
  selectedPartnerId?: string | null;
  onPartnerSelect?: (partnerId: string | null) => void;
}

export default function MarkedMap({
  partners,
  selectedPartnerId,
  onPartnerSelect,
}: PartnerMapProps) {
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    const prev = window.gm_authFailure;
    window.gm_authFailure = () => {
      setAuthFailed(true);
      if (typeof prev === "function") prev();
    };
    return () => {
      window.gm_authFailure = prev;
    };
  }, []);

  // Prevent any Google POI clicks
  const handleMapClick = useCallback((event: MapMouseEvent) => {
    // Stop propagation to prevent Google Places from opening
    if (event && event.stop) {
      event.stop();
    }
  }, []);

  if (authFailed) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-3 bg-muted/80 p-6 text-center"
        role="alert"
      >
        <p className="max-w-md text-sm font-medium text-foreground">
          Harta nuk mund të ngarkohet: projekti Google Cloud duhet të ketë
          faturim të aktivizuar për Maps JavaScript API (edhe për përdorim në
          kuotën falas).
        </p>
        <a
          href={MAPS_BILLING_DOC}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Udhëzime zyrtare nga Google
        </a>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        onError={() => setAuthFailed(true)}
      >
        <Map
          defaultCenter={{ lat: 41.3367908, lng: 19.8207222 }}
          defaultZoom={10}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          onClick={handleMapClick}
        >
          <ClusteredPartnerMarkers
            partners={partners}
            selectedPartnerId={selectedPartnerId}
            onPartnerSelect={onPartnerSelect}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
