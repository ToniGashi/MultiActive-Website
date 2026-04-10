"use client";

import Listings from "@/components/ui/partners/listings";
import PartnerMap from "@/components/ui/partners/map";
import React, { useState } from "react";
import { partners } from "./data";

export default function PartnersClient() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  );
  const [mobileView, setMobileView] = useState<"map" | "partners">("map");
  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
  };

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col gap-3 p-3 animate-fade-in-up md:gap-6 md:p-6 lg:h-[calc(100dvh-7rem)] lg:flex-row">
      {/* Mobile Toggle Buttons - Only visible on mobile */}
      <div className="mb-3 flex rounded-2xl border border-white/10 bg-card/80 p-1 shadow-[0_0_32px_-12px_rgba(59,130,246,0.15)] backdrop-blur-sm lg:hidden">
        <button
          type="button"
          onClick={() => setMobileView("map")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 ${
            mobileView === "map"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0l-6-2"
            />
          </svg>
          <span className="font-medium">Hartë</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView("partners")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 ${
            mobileView === "partners"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <svg
            className="w-4 h-4"
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
          <span className="font-medium">Lista</span>
        </button>
      </div>

      {/* Map Section - 50% on desktop, conditional on mobile */}
      <div
        className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-card/90 shadow-[0_0_40px_-16px_rgba(59,130,246,0.2)] backdrop-blur-sm lg:w-1/2 xl:rounded-2xl ${
          mobileView === "map"
            ? "h-[min(70dvh,calc(100dvh-11rem))] lg:h-full"
            : "hidden lg:block lg:h-full"
        }`}
      >
        <div className="h-full">
          <PartnerMap
            partners={partners}
            selectedPartnerId={selectedPartnerId}
            onPartnerSelect={setSelectedPartnerId}
          />
        </div>
      </div>

      {/* Listings Section - 50% on desktop, conditional on mobile */}
      <div
        className={`w-full lg:w-1/2 ${
          mobileView === "partners"
            ? "h-[min(70dvh,calc(100dvh-11rem))] lg:h-full"
            : "hidden lg:block lg:h-full"
        }`}
      >
        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-card/90 shadow-[0_0_40px_-16px_rgba(59,130,246,0.2)] backdrop-blur-sm xl:rounded-2xl">
          {/* Header - More compact on mobile */}
          <div className="border-b border-white/10 bg-muted/40 p-3 md:p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground md:text-xl">
              <svg
                className="h-4 w-4 text-primary md:h-5 md:w-5"
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
              <span className="hidden sm:inline">Partnerët tanë</span>
              <span className="sm:hidden">Partnerë</span>
            </h2>
            <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
              {partners.length} partnerë
            </p>
          </div>

          {/* Scrollable listings area */}
          <div className="h-full overflow-y-auto">
            <Listings
              partners={partners}
              onPartnerSelect={handlePartnerSelect}
              selectedPartnerId={selectedPartnerId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
