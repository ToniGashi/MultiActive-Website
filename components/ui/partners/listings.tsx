import Link from "next/link";
import { IPartner } from "./types";

interface ListingsProps {
  partners: IPartner[];
  onPartnerSelect: (partnerId: string) => void;
  selectedPartnerId: string | null;
}

const Listings = ({
  partners,
  onPartnerSelect,
  selectedPartnerId,
}: ListingsProps) => {
  return (
    <div className="p-2 md:p-4 partners-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
        {partners.map((partner: IPartner, index: number) => (
          <div
            key={partner.name}
            className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border overflow-hidden partner-card-hover animate-fade-in-up cursor-pointer ${
              selectedPartnerId === partner.id
                ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                : "border-gray-100"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onPartnerSelect(partner.id)}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url(${partner.mainImage})`,
              }}
            >
              {/* Dark Overlay - Stronger on mobile for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 md:from-black/70 md:via-black/30 md:to-transparent"></div>
            </div>

            {/* Content - More compact on mobile */}
            <div className="relative z-10 p-3 md:p-4 flex flex-col justify-between h-32 md:h-40">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg text-white mb-1 group-hover:text-blue-200 transition-colors truncate">
                    {partner.name}
                  </h3>
                  <div className="flex items-center gap-1 md:gap-2 text-white/90 text-xs md:text-sm">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
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
                    <span className="truncate">{partner.city}</span>
                  </div>

                  {/* Address - Hidden on very small screens, shown on md+ */}
                  <div className="hidden md:flex items-center gap-2 text-white/80 text-xs mt-1">
                    <svg
                      className="w-3 h-3 flex-shrink-0"
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
                    <span className="truncate">{partner.address}</span>
                  </div>
                </div>

                {/* Status Badge - Smaller on mobile */}
                <div className="flex items-center gap-1 bg-green-500/90 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium animate-pulse-glow ml-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Open</span>
                </div>
              </div>

              {/* Action Button - More compact on mobile */}
              <Link
                href={`/partners/${partner.id}`}
                className="w-full mt-2 md:mt-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full glass-effect text-white font-semibold py-1.5 md:py-2 px-3 md:px-4 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 group-hover:bg-blue-600 group-hover:text-white text-sm md:text-base">
                  <span className="hidden sm:inline">Shiko më shumë</span>
                  <span className="sm:hidden">Details</span>
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
