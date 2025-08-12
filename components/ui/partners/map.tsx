"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { IPartner } from "./types";
import { ClusteredPartnerMarkers } from "./partnerMarker";
import { useCallback } from "react";

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
  // Prevent any Google POI clicks
  const handleMapClick = useCallback((event: any) => {
    // Stop propagation to prevent Google Places from opening
    if (event && event.stop) {
      event.stop();
    }
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
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
