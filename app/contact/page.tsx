import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Na Kontaktoni",
  description:
    "Na kontaktoni për çdo pyetje ose nevojë. Multi Active Card është këtu për t'ju ndihmuar me telefon ose email. Jemi gati t'ju përgjigjemi brenda 24 orëve.",
  keywords: [
    "kontakt Multi Active Card",
    "na kontaktoni",
    "pyetje",
    "ndihmë",
    "mbështetje",
    "telefon",
    "email",
    "informacion",
    "ndihmë klientësh",
  ],
  openGraph: {
    title: "Na Kontaktoni - Multi Active Card",
    description:
      "Na kontaktoni për çdo pyetje ose nevojë. Multi Active Card është këtu për t'ju ndihmuar me telefon ose email.",
    url: "https://multiactivecard.com/contact",
    images: [
      {
        url: "/images/social-share.png",
        width: 1200,
        height: 630,
        alt: "Kontaktoni Multi Active Card",
      },
    ],
  },
  twitter: {
    title: "Na Kontaktoni - Multi Active Card",
    description:
      "Na kontaktoni për çdo pyetje ose nevojë. Multi Active Card është këtu për t'ju ndihmuar me telefon ose email.",
    images: ["/images/social-share.png"],
  },
};

export default function Contact() {
  const email =
    process.env.CONTACT_EMAIL?.trim() || "info@multiactivecard.com";
  const phone = process.env.CONTACT_PHONE?.trim() || "+355 123 456 789";

  return <ContactClient email={email} phone={phone} />;
}
