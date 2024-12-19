import React from "react";
import PartnerMap from "@/components/ui/partners/map";
import Listings from "@/components/ui/partners/listings";
import PARTNERS from "@/components/ui/partners/PartnersData";

function Page() {
  return (
    <div className="flex gap-5 h-screen mt-10">
      <div className="w-full h-5/6">
        <PartnerMap partners={PARTNERS} />
      </div>
      <div className="w-full h-5/6">
        <Listings partners={PARTNERS} />
      </div>
    </div>
  );
}

export default Page;
