import PartnersClient from "@/components/ui/partners/partnersClient";
import { partners } from "../data";

function PartnerHeader({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <header className="text-center mb-6 md:mb-12 bg-gradient-to-r from-[#6366f1] to-[#3d4295] rounded-lg md:rounded-xl p-4 md:p-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center animate-pulse-glow">
            <svg
              className="w-4 h-4 md:w-6 md:h-6 text-white"
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
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold gradient-text text-gray-900">
            {name}
          </h1>
        </div>
        <p className="text-sm md:text-lg lg:text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed px-2">
          {description}
        </p>
      </div>
    </header>
  );
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partnerData = partners.find((partner) => partner.id === id)!;

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-6 max-w-7xl animate-fade-in-up">
      <PartnerHeader
        name={partnerData?.name ?? ""}
        description={partnerData?.description ?? ""}
      />
      <PartnersClient partnerData={partnerData ?? []} />
    </div>
  );
}
