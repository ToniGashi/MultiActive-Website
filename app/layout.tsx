import "./css/style.css";

import { Inter } from "next/font/google";

import DockMorph from "@/components/ui/dock-morph";
import Footer from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
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
        url: "/images/social-share.png",
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
    images: ["/images/social-share.png"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050506" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

function SiteAmbient() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-32 top-0 h-[min(520px,70vh)] w-[min(520px,70vw)] rounded-full bg-primary/18 blur-[120px]" />
      <div className="absolute -right-24 top-1/4 h-[min(420px,55vh)] w-[min(420px,55vw)] rounded-full bg-sky-500/12 blur-[100px]" />
      <div className="absolute bottom-0 left-1/2 h-48 w-[85%] max-w-4xl -translate-x-1/2 rounded-full bg-primary/8 blur-[72px]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" className="dark">
      <body
        className={`${inter.variable} bg-background font-inter text-base text-foreground antialiased`}
      >
        <div className="relative flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <SiteAmbient />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col pb-24 sm:pb-28">
            {children}
          </div>
          <DockMorph position="bottom" />
          <Footer />
        </div>
      </body>
    </html>
  );
}
