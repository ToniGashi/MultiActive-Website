import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Na Kontaktoni",
  description:
    "Na kontaktoni për çdo pyetje ose nevojë. Multi Active Card është këtu për t'ju ndihmuar. Dërgoni mesazhin tuaj ose na telefononi. Jemi gati t'ju përgjigjemi brenda 24 orëve.",
  keywords: [
    "kontakt Multi Active Card",
    "na kontaktoni",
    "pyetje",
    "ndihmë",
    "mbështetje",
    "telefon",
    "email",
    "mesazh",
    "bëhu partner",
    "anëtarësim",
    "informacion",
    "ndihmë klientësh",
  ],
  openGraph: {
    title: "Na Kontaktoni - Multi Active Card",
    description:
      "Na kontaktoni për çdo pyetje ose nevojë. Multi Active Card është këtu për t'ju ndihmuar.",
    url: "https://multiactivecard.com/contact",
    images: [
      {
        url: "/images/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kontaktoni Multi Active Card",
      },
    ],
  },
  twitter: {
    title: "Na Kontaktoni - Multi Active Card",
    description:
      "Na kontaktoni për çdo pyetje ose nevojë. Multi Active Card është këtu për t'ju ndihmuar.",
    images: ["/images/contact-twitter.jpg"],
  },
};

export default function Contact() {
  return <ContactClient />;
}
