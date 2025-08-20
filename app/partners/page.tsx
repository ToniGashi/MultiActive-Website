import { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Partnerët Tanë",
  description:
    "Zbuloni rrjetin tonë të gjerë të partnerëve të fitness dhe wellness në gjithë Shqipërinë. Palestrat, spa dhe qendrat e mirëqenies më të mira në dispozicion tuaj me Multi Active Card. Gjeni lokacionin më të afërt dhe filloni udhëtimin tuaj për një jetësë të shëndetshme.",
  keywords: [
    "partnerë Multi Active Card",
    "palestër Shqipëri",
    "spa Shqipëri",
    "qendra fitnessi",
    "qendra wellness",
    "lokacione",
    "harta partnerësh",
    "objekte fitnessi",
    "palestër Tiranë",
    "spa Tiranë",
    "fitness partner",
    "wellness partner",
  ],
  openGraph: {
    title: "Partnerët Tanë - Multi Active Card",
    description:
      "Zbuloni rrjetin tonë të gjerë të partnerëve të fitness dhe wellness në gjithë Shqipërinë. Palestrat, spa dhe qendrat e mirëqenies më të mira.",
    url: "https://multiactivecard.com/partners",
    images: [
      {
        url: "/images/partners-og.jpg",
        width: 1200,
        height: 630,
        alt: "Partnerët e Multi Active Card",
      },
    ],
  },
  twitter: {
    title: "Partnerët Tanë - Multi Active Card",
    description:
      "Zbuloni rrjetin tonë të gjerë të partnerëve të fitness dhe wellness në gjithë Shqipërinë.",
    images: ["/images/partners-twitter.jpg"],
  },
};

export default function Partners() {
  return <PartnersClient />;
}
