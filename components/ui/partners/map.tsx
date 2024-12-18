"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { IPartner } from "./types";
import { ClusteredPartnerMarkers } from "./partnerMarker";

export default function MarkedMap({ partners }: { partners: IPartner[] }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map
          defaultCenter={{ lat: 41.3367908, lng: 19.8207222 }}
          defaultZoom={10}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <ClusteredPartnerMarkers partners={partners} />
        </Map>
      </APIProvider>
    </div>
  );
}
