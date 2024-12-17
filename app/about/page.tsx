import Image from "next/image";
import { type Metadata } from "next";
import AboutUsClientPage from "./AboutUsPage.client";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us Page",
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
