import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FileTextIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Termat dhe Kushtet",
  description:
    "Lexoni termat dhe kushtet e Multi Active Card. Informacion i detajuar rreth shërbimeve tona, të drejtave të pronësisë, aktiviteteve të ndaluara dhe menaxhimit të shërbimeve. Të gjitha rregullat dhe politikat që duhet të dini.",
  keywords: [
    "termat dhe kushtet",
    "kushtet e shërbimit",
    "rregullat Multi Active Card",
    "politika",
    "të drejtat e pronësisë",
    "përgjegjësitë",
    "shërbimet",
    "rregullore",
    "kushtet e anëtarësimit",
  ],
  openGraph: {
    title: "Termat dhe Kushtet - Multi Active Card",
    description:
      "Lexoni termat dhe kushtet e Multi Active Card. Informacion i detajuar rreth shërbimeve dhe rregullave tona.",
    url: "https://multiactivecard.com/terms",
    images: [
      {
        url: "/images/social-share.png",
        width: 1200,
        height: 630,
        alt: "Termat dhe Kushtet Multi Active Card",
      },
    ],
  },
  twitter: {
    title: "Termat dhe Kushtet - Multi Active Card",
    description:
      "Lexoni termat dhe kushtet e Multi Active Card. Informacion i detajuar rreth shërbimeve dhe rregullave tona.",
    images: ["/images/social-share.png"],
  },
};

function TermBlock({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-white/10 bg-card/80 p-6 shadow-[0_0_40px_-20px_rgba(59,130,246,0.12)] backdrop-blur-sm md:p-8"
    >
      <h2 className="border-b border-border pb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {title}
      </h2>
      <div className="pt-6">{children}</div>
    </section>
  );
}

function TermItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-primary/25 pl-4">
      <h3 className="text-sm font-semibold text-foreground">{label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
        {children}
      </p>
    </div>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-[60vh] border-t border-white/[0.06] bg-gradient-to-b from-background via-zinc-950/30 to-background px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center md:mb-14">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileTextIcon className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Termat dhe kushtet
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Këto rregulla përcaktojnë përdorimin e shërbimeve të Multi Active
            Card. Duke vazhduar, ju pranoni këto kushte në tërësi.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            Për pyetje ligjore ose sqarime, na shkruani në{" "}
            <Link
              href="/contact"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              faqen e kontaktit
            </Link>
            .
          </p>
        </header>

        <div className="flex flex-col gap-6 md:gap-8">
          <TermBlock id="sherbimet" title="Shërbimet tona">
            <div className="space-y-8">
              <TermItem label="Aktivitete fizike">
                Ne ofrojmë programe të personalizuara për aktivitete fizike që
                përmirësojnë shëndetin dhe mirëqenien e stafit tuaj përmes
                rrjetit tonë të partnerëve.
              </TermItem>
              <TermItem label="Zgjidhje inovative">
                Zgjidhje të përshtatura për nevojat specifike të kompanisë suaj,
                duke përfshirë trajnime, programe motivuese dhe më shumë.
              </TermItem>
              <TermItem label="Mbështetje e vazhdueshme">
                Ekipi ynë ofron asistencë për të siguruar suksesin e çdo programi
                të implementuar.
              </TermItem>
            </div>
          </TermBlock>

          <TermBlock id="pronësia" title="Të drejtat e pronësisë">
            <div className="space-y-8">
              <TermItem label="Pronësia">
                Të gjitha përmbajtjet, programet dhe materialet janë të mbrojtura
                nga ligjet e të drejtave të autorit.
              </TermItem>
              <TermItem label="Përdorimi i kufizuar">
                Nuk lejohet riprodhimi, shpërndarja apo modifikimi i materialeve
                tona pa leje të shkruar.
              </TermItem>
              <TermItem label="Çmimet">
                Çmimet tona janë të qarta dhe transparente, duke ofruar vlerën më
                të mirë për investimin tuaj.
              </TermItem>
            </div>
          </TermBlock>

          <TermBlock id="ndaluar" title="Aktivitete të ndaluara">
            <div className="space-y-8">
              <TermItem label="Përdorim i paautorizuar">
                Nuk lejohet përdorimi i shërbimeve tona për qëllime të
                paligjshme ose të dëmshme.
              </TermItem>
              <TermItem label="Modifikimi i programeve">
                Nuk lejohet të ndryshoni apo manipuloni programet e ofruara nga
                Multi Active Card.
              </TermItem>
            </div>
          </TermBlock>

          <TermBlock id="menaxhimi" title="Menaxhimi i shërbimeve">
            <div className="space-y-8">
              <TermItem label="Mbështetje">
                Multi Active Card ofron mbështetje për të gjitha shërbimet dhe
                programet e implementuara.
              </TermItem>
              <TermItem label="Pezullimi i shërbimeve">
                Ne rezervojmë të drejtën për të pezulluar aksesin në rast të
                shkeljes së rregullave tona.
              </TermItem>
              <TermItem label="Ndryshime në terma">
                Ne mund të përditësojmë këto terma periodikisht për të reflektuar
                ndryshimet në shërbimet tona.
              </TermItem>
            </div>
          </TermBlock>

          <TermBlock id="kontakt" title="Informacion kontakti">
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                Për çdo pyetje apo paqartësi në lidhje me shërbimet tona, na
                kontaktoni përmes kanaleve tona zyrtare të komunikimit.
              </p>
              <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                Duke përdorur shërbimet tona, ju pranoni të respektoni këto terma
                dhe kushte në tërësi.
              </p>
            </div>
          </TermBlock>
        </div>
      </div>
    </main>
  );
}
