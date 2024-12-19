import Link from "next/link";
import { IPartner } from "./types";

const Listings = ({ partners }: { partners: IPartner[] }) => {
  return (
    <div className="w-full grid grid-cols-2 h-full gap-5 overflow-x-scroll">
      {partners.map((partner: IPartner) => (
        <div
          key={partner.name}
          className="w-full h-56 relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url(${partner.main_image})`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

          {/* Text Content */}
          <div className="relative z-20 p-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-md text-white">{partner.name}</h2>
              <p className="text-white">{partner.city}</p>
              <p className="text-white">{partner.address}</p>
            </div>

            {/* Button */}
            <Link href={`/partners/${partner.id}`} className="w-full">
              <button className="px-4 py-2 bg-blue-500/80 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listings;
