import dynamic from "next/dynamic";
import BannerDemo from "@/components/ui/banner-demo";
import Hero from "@/components/hero-home";

const PricingSectionDemo = dynamic(
  () => import("@/components/ui/pricing-demo"),
  {
    loading: () => (
      <div
        className="min-h-[48rem] w-full animate-pulse bg-muted/10 py-20 sm:min-h-[52rem] sm:py-24"
        aria-hidden
      />
    ),
  },
);

const GridFeatureCardsDemo = dynamic(
  () => import("@/components/ui/grid-feature-cards-demo"),
  {
    loading: () => (
      <div
        className="min-h-[36rem] w-full animate-pulse bg-muted/10 py-16 md:min-h-[40rem]"
        aria-hidden
      />
    ),
  },
);

export const metadata = {
  title: "Kryefaqja",
  description:
    "Zbuloni Multi Active Card, anëtarësimin kryesor të fitnessit dhe mirëqenies në Shqipëri që ju jep qasje në palestrat, spa dhe qendrat e mirëqenies më të mira. Filloni sot udhëtimin tuaj për një jetësë të shëndetshme me benefite ekskluzive dhe objekte premium.",
  keywords: [
    "Multi Active Card",
    "anëtarësim fitnessi Shqipëri",
    "anëtarësim palestër",
    "qendra mirëqenie",
    "anëtarësim klub shëndeti",
    "kartë fitnessi",
    "qasje spa",
    "fitness premium",
    "rrjet fitnessi Shqipëri",
    "jetësë aktive",
    "palestër Tiranë",
    "spa Shqipëri",
  ],
  openGraph: {
    title: "Multi Active Card - Rrjeti Premium i Fitness dhe Wellness",
    description:
      "Bashkohuni me rrjetin kryesor të fitnessit dhe mirëqenies në Shqipëri. Qasje në palestrat, spa dhe qendrat e mirëqenies më të mira me një kartë anëtarësimi.",
    url: "https://multiactivecard.com",
    images: [
      {
        url: "/images/social-share.png",
        width: 1200,
        height: 630,
        alt: "Multi Active Card Kryefaqja",
      },
    ],
  },
  twitter: {
    title: "Multi Active Card - Rrjeti Premium i Fitness dhe Wellness",
    description:
      "Bashkohuni me rrjetin kryesor të fitnessit dhe mirëqenies në Shqipëri. Qasje në palestrat, spa dhe qendrat e mirëqenies më të mira me një kartë anëtarësimi.",
    images: ["/images/social-share.png"],
  },
};

export default function Home() {
  return (
    <>
      <BannerDemo />
      <Hero />
      <PricingSectionDemo />
      <GridFeatureCardsDemo />
    </>
  );
}
