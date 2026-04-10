"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function ScrollExpansionHeroDemo() {
  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/hero.mp4"
        posterSrc="/brand/training-deadlift.png"
        mobileHeroImageSrc="/brand/hero-competition.png"
        bgImageSrc="/images/social-share.png"
        title="Multi Active Card"
        date="Mireqenie per ekipin tuaj"
        scrollToExpand="Lexo poshte per te zbuluar planet"
        textBlend
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-black tracking-tight md:text-4xl">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Multi Active Card
            </span>
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Ofrojme zgjidhje per mireqenien e punonjesve qe rrisin lumturine dhe
            produktivitetin ne kompanine tuaj. Me nje karte te vetme, punonjesit
            marrin qasje ne rrjetin tone premium te fitness dhe wellness.
          </p>
          <p className="text-lg text-muted-foreground">
            Eksploroni me poshte planet Argjend, Flori dhe Diamant, benefitet
            kryesore per kompanine tuaj dhe menyren si mund te bashkoheni me
            rrjetin tone te partnereve.
          </p>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
