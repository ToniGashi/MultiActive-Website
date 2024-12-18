import React from "react";
import PartnerMap from "@/components/ui/partners/map";
import Listings from "@/components/ui/partners/listings";
import { IPartner } from "@/components/ui/partners/types";

export const partners: IPartner[] = [
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d",
    name: "Tech Solutions Inc.",
    main_image: "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    description: "A trusted partner for cutting-edge technology solutions.",
    images: [
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    ],
    open_time: "09:00",
    close_time: "18:00",
    day_offs: ["Sunday"],
    address: "Rruga e Dibrës 123",
    city: "Tirana",
    country: "Albania",
    thumbnail_image:
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    longitude: 19.818045,
    latitude: 41.323847,
    created_at: new Date("2023-01-15T10:00:00Z"),
    updated_at: new Date("2023-01-15T10:00:00Z"),
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7499A",
    name: "Eco Green Corp.",
    main_image: "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    description: "Innovative eco-friendly solutions for a sustainable future.",
    images: [
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    ],
    open_time: "08:00",
    close_time: "17:00",
    day_offs: ["Saturday", "Sunday"],
    address: "Rruga e Kavajës 456",
    city: "Tirana",
    country: "Albania",
    thumbnail_image:
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    longitude: 19.818665,
    latitude: 41.323897,
    created_at: new Date("2023-02-10T09:30:00Z"),
    updated_at: new Date("2023-02-10T09:30:00Z"),
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7411X",
    name: "Health First Clinic",
    main_image: "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    description: "Comprehensive healthcare services for everyone.",
    images: [
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    ],
    open_time: "07:00",
    close_time: "20:00",
    day_offs: [],
    address: "Bulevardi Zhan D’Ark 789",
    city: "Tirana",
    country: "Albania",
    thumbnail_image:
      "https://azureblobimg.blob.core.windows.net/coolvacay/12.png",
    longitude: 19.818745,
    latitude: 41.325727,
    created_at: new Date("2023-03-20T08:15:00Z"),
    updated_at: new Date("2023-03-20T08:15:00Z"),
  },
];

function Page() {
  return (
    <div className="flex gap-5 h-screen mt-10">
      <div className="w-full h-5/6">
        <PartnerMap partners={partners} />
      </div>
      <div className="w-full h-5/6">
        <Listings partners={partners} />
      </div>
    </div>
  );
}

export default Page;
