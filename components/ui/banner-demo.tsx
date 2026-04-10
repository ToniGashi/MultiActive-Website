import React from "react";
import { Banner } from "@/components/ui/banner";

const BannerDemo = () => {
  return (
    <div className="w-full">
      <Banner
        variant="rainbow"
        className="border-b border-white/10 shadow-[0_8px_32px_-12px_rgba(59,130,246,0.25)]"
        rainbowColors={[
          "rgba(59,130,246,0.45)",
          "rgba(14,165,233,0.35)",
          "transparent",
          "rgba(59,130,246,0.4)",
          "transparent",
          "rgba(96,165,250,0.3)",
          "transparent",
        ]}
      >
        Multi Active Card - Mireqenia e punonjesve qe rrit lumturine dhe produktivitetin.
      </Banner>
    </div>
  );
};

export default BannerDemo;
