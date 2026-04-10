import PartnersClient from "@/components/ui/partners/partnersClient";
import { partners } from "../data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const partner = partners.find((p) => p.id === id);

  if (!partner) {
    return {
      title: "Partner i panjohur",
      description: "Partneri që kërkoni nuk është gjetur.",
    };
  }

  return {
    title: partner.name,
    description: `Zbuloni ${partner.name} në ${partner.city}. ${partner.description} Pjesë e rrjetit Multi Active Card për fitness dhe wellness në Shqipëri.`,
    keywords: [
      partner.name,
      partner.city,
      "fitness",
      "wellness",
      "palestër",
      "spa",
      "Multi Active Card",
      "partner",
      "Shqipëri",
      "anëtarësim",
    ],
    openGraph: {
      title: `${partner.name} - Multi Active Card Partner`,
      description: `Zbuloni ${partner.name} në ${partner.city}. ${partner.description}`,
      url: `https://multiactivecard.com/partners/${partner.id}`,
      images: [
        {
          url: partner.mainImage || "/images/social-share.png",
          width: 1200,
          height: 630,
          alt: `${partner.name} - Multi Active Card Partner`,
        },
      ],
    },
    twitter: {
      title: `${partner.name} - Multi Active Card Partner`,
      description: `Zbuloni ${partner.name} në ${partner.city}. ${partner.description}`,
      images: [partner.mainImage || "/images/social-share.png"],
    },
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partnerData = partners.find((partner) => partner.id === id);

  if (!partnerData) {
    notFound();
  }

  const heroImage = partnerData.mainImage || partnerData.images[0];

  return (
    <div className="relative min-h-screen overflow-hidden text-zinc-100">
      <Link
        href="/partners"
        className="group relative z-30 mx-4 mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-primary/40 hover:bg-white/10 hover:text-white md:mx-8 md:mt-8"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Partnerët
      </Link>

      <section className="relative z-10 mt-4 px-4 pb-8 md:mt-6 md:px-8">
        <div className="relative mx-auto max-h-[min(78vh,820px)] min-h-[420px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_80px_-20px_rgba(0,0,0,0.8),0_0_120px_-30px_rgba(59,130,246,0.35)] md:min-h-[520px]">
          <Image
            src={heroImage}
            alt={partnerData.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-transparent mix-blend-soft-light" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(59,130,246,0.12)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Partner i rrjetit
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-6xl lg:text-7xl">
              {partnerData.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              {partnerData.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-zinc-200 backdrop-blur-md">
                {partnerData.city}
              </span>
              <span className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-zinc-200 backdrop-blur-md">
                {partnerData.country}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 md:px-8 md:pb-36">
        <PartnersClient partnerData={partnerData} />
      </div>
    </div>
  );
}
