import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Multi Active Card - Porta juaj për Fitness dhe Wellness Premium",
    template: "%s | Multi Active Card",
  },
  description:
    "Multi Active Card ju ofron qasje ekskluzive në qendrat më të mira të fitnessit, spa dhe mirëqeniet në gjithë Shqipërinë. Bashkohuni me rrjetin tonë të individëve të vetëdijshëm për shëndetin dhe zbuloni një jetësë më të shëndetshme.",
  keywords: [
    "fitness",
    "mirëqenie",
    "palestër",
    "spa",
    "shëndet",
    "Shqipëri",
    "kartë anëtarësimi",
    "qendra fitnessi",
    "qendra mirëqenie",
    "Multi Active Card",
    "jetësë aktive",
    "klub shëndeti",
    "anëtarësim fitnessi",
    "fitness premium",
    "palestër Tiranë",
    "spa Shqipëri",
  ],
  authors: [{ name: "Ekipi Multi Active Card" }],
  creator: "Multi Active Card",
  publisher: "Multi Active Card",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://multiactivecard.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sq_AL",
    url: "https://multiactivecard.com",
    title: "Multi Active Card - Porta juaj për Fitness dhe Wellness Premium",
    description:
      "Multi Active Card ju ofron qasje ekskluzive në qendrat më të mira të fitnessit, spa dhe mirëqeniet në gjithë Shqipërinë. Bashkohuni me rrjetin tonë të individëve të vetëdijshëm për shëndetin.",
    siteName: "Multi Active Card",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Multi Active Card - Rrjeti Premium i Fitness dhe Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Active Card - Porta juaj për Fitness dhe Wellness Premium",
    description:
      "Multi Active Card ju ofron qasje ekskluzive në qendrat më të mira të fitnessit, spa dhe mirëqeniet në gjithë Shqipërinë.",
    images: ["/images/twitter-image.jpg"],
    creator: "@multiactivecard",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
