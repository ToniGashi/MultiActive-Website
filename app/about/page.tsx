import Image from "next/image";
import { type Metadata } from "next";
import AboutUsClientPage from "./AboutUsPage.client";

export const metadata: Metadata = {
  title: "Rreth Nesh",
  description:
    "Mësoni më shumë rreth Multi Active Card, misionit tonë për të promovuar një jetësë të shëndetshme dhe se si po ndryshojmë industrinë e fitnessit në Shqipëri. Zbuloni historinë tonë, vlerat dhe angazhimin tonë ndaj ekselencës.",
  keywords: [
    "rreth Multi Active Card",
    "historia jonë",
    "misioni",
    "vlerat",
    "ekipi",
    "fitness Shqipëri",
    "jetësë e shëndetshme",
    "inovacion",
    "wellness",
    "angazhim",
  ],
  openGraph: {
    title: "Rreth Nesh - Multi Active Card",
    description:
      "Mësoni më shumë rreth Multi Active Card dhe misionit tonë për të promovuar një jetësë të shëndetshme në Shqipëri.",
    url: "https://multiactivecard.com/about",
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Rreth Multi Active Card",
      },
    ],
  },
  twitter: {
    title: "Rreth Nesh - Multi Active Card",
    description:
      "Mësoni më shumë rreth Multi Active Card dhe misionit tonë për të promovuar një jetësë të shëndetshme në Shqipëri.",
    images: ["/images/about-twitter.jpg"],
  },
};

export default function Page() {
  return (
    <main className="flex flex-col">
      <div className="relative -mt-24 flex h-[588px]">
        <div className="absolute flex h-[588px] w-full">
          <Image
            alt="Coolvacay about us hero image"
            src="/about_us.jpg"
            fill
            priority={true}
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(40%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <AboutUsClientPage />
    </main>
  );
}
