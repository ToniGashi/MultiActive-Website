"use client";

import Listings from "@/components/ui/partners/listings";
import PartnerMap from "@/components/ui/partners/map";
import React, { useState } from "react";
import { partners } from "./data";

export default function Partners() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  );
  const [mobileView, setMobileView] = useState<"map" | "partners">("map");
  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row gap-3 md:gap-6 p-3 md:p-6 animate-fade-in-up">
      {/* Mobile Toggle Buttons - Only visible on mobile */}
      <div className="lg:hidden flex bg-white rounded-lg shadow-lg border border-gray-200 p-1 mb-3">
        <button
          onClick={() => setMobileView("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
            mobileView === "map"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
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
          <span className="font-medium">Map</span>
        </button>
        <button
          onClick={() => setMobileView("partners")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
            mobileView === "partners"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
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
          <span className="font-medium">Partners</span>
        </button>
      </div>

      {/* Map Section - 50% on desktop, conditional on mobile */}
      <div
        className={`w-full lg:w-1/2 rounded-lg xl:rounded-xl overflow-hidden shadow-lg border border-gray-200 ${
          mobileView === "map"
            ? "h-[calc(100vh-140px)] lg:h-full"
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
            ? "h-[calc(100vh-140px)] lg:h-full"
            : "hidden lg:block lg:h-full"
        }`}
      >
        <div className="bg-white rounded-lg xl:rounded-xl shadow-lg border border-gray-200 h-full overflow-hidden">
          {/* Header - More compact on mobile */}
          <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg md:text-xl font-bold gradient-text flex items-center gap-2">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
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
              <span className="hidden sm:inline text-gray-700">
                Partnerët tanë
              </span>
              <span className="sm:hidden">Partners</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
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
