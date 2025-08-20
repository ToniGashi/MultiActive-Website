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
        url: "/images/homepage-og.jpg",
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
    images: ["/images/homepage-twitter.jpg"],
  },
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";

import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      {/* <Testimonials /> */}
      <Cta />
    </>
  );
}
