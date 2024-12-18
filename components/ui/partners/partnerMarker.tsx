"use client";
import { AdvancedMarker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { IPartner } from "./types";

type PartnerMarkerProps = {
  partner: IPartner;
  onClick: (partner: IPartner) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

const PartnerMarker = (props: PartnerMarkerProps) => {
  const { partner, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(partner), [onClick, partner]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, partner.id),
    [setMarkerRef, partner.id]
  );

  return (
    <AdvancedMarker
      key={partner.id}
      position={{ lat: partner.latitude, lng: partner.longitude }}
      ref={ref}
      onClick={handleClick}
    >
      <span className="marker-clustering-partner w-5 text-3xl">🌳</span>
    </AdvancedMarker>
  );
};

export const ClusteredPartnerMarkers = ({
  partners,
}: {
  partners: IPartner[];
}) => {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedPartnerId, setSelectedPartnerKey] = useState<string | null>(
    null
  );

  const selectedPartner = useMemo(
    () =>
      partners && selectedPartnerId
        ? partners.find((t) => t.id === selectedPartnerId)!
        : null,
    [partners, selectedPartnerId]
  );

  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedPartnerKey(null);
  }, []);

  const handleMarkerClick = useCallback((partner: IPartner) => {
    setSelectedPartnerKey(partner.id);
  }, []);

  return (
    <>
      {partners.map((partner) => (
        <PartnerMarker
          key={partner.id}
          partner={partner}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedPartnerId && (
        <InfoWindow
          anchor={markers[selectedPartnerId]}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="w-full flex gap-6">
            <div className="flex flex-col w-1/2 text-black">
              <span className="font-bold">{selectedPartner?.name}</span>
              <br />
              <span className="font-medium">
                {selectedPartner?.description}
              </span>
            </div>
            <div
              className="w-1/2"
              style={{ background: `url(${selectedPartner?.thumbnail_image})` }}
            ></div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
