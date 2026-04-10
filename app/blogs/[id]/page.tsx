import Link from "next/link";
import { Metadata } from "next";

const copy: Record<
  string,
  { title: string; body: string[] }
> = {
  "1": {
    title: "Pse aktiviteti fizik rregullisht ndikon në energjinë tuaj",
    body: [
      "Stërvitja e rregullt ndihmon trupin të përdorë më mirë oksigjenin dhe të ruajë masën muskulore, që shpesh përkthehet në më shumë energji gjatë ditës.",
      "Nuk ju duhet një program ekstrem: edhe shëtitje, not i lehtë ose 2–3 seanca në javë në një qendër partner mund të japin ndryshim të dukshëm në gjendjen shpirtërore dhe në gjumin.",
      "Multi Active Card ju jep fleksibilitet për të provuar ambiente të ndryshme dhe për të gjetur atë që ju përshtatet — kjo e bën më të lehtë që zakonin të qëndrojë.",
    ],
  },
  "2": {
    title: "Wellness në punë: ku të filloni pa komplikime",
    body: [
      "Filloni me diçka të matshme: një aktivitet grupor në muaj, ose një përfitim që punonjësit e përdorin menjëherë (p.sh. qasje në palestra dhe spa partnerë).",
      "Komunikoni qartë: përshkruani çfarë ofroni dhe si mund ta aktivizojnë — sa më pak friction, aq më shumë përdorim.",
      "Vlerësoni pas disa muajsh: pyetje të shkurtra ose përdorim i përfitimeve ju tregon nëse duhet të shtoni varietet ose orare.",
    ],
  },
  "3": {
    title: "Si të zgjidhni qendrën e duhur fitness për stilin tuaj",
    body: [
      "Shikoni oraret dhe distancën nga shtëpia ose puna — një vend “i mirë” që nuk e përdorni kurrë nuk vlen sa një më pak perfekt por i përdorshëm.",
      "Vlerësoni shërbimet: a ju duhet vetëm palestër, apo edhe grup, spa, ose trajner? Kartat që mbulojnë rrjet të gjerë ju lejojnë të eksperimentoni.",
      "Provoni disa vizita përpara se të vendosni: shumë vende partner ofrojnë përvoja të ndryshme; gjeni atë ku ndiheni të mirëpritur.",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = copy[id];

  return {
    title: article?.title ?? `Blog ${id}`,
    description:
      article?.body[0] ??
      "Artikuj për fitness, wellness dhe jetësë të shëndetshme me Multi Active Card.",
    openGraph: {
      title: article?.title ?? "Blog - Multi Active Card",
      description:
        article?.body[0] ??
        "Artikuj për fitness dhe wellness në Shqipëri.",
      url: `https://multiactivecard.com/blogs/${id}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = copy[id];

  if (!article) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Artikulli nuk u gjet.</p>
        <Link
          href="/blogs"
          className="mt-6 inline-block text-primary underline-offset-4 hover:underline"
        >
          Kthehu te blogu
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link
        href="/blogs"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        ← Blogu
      </Link>
      <article className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
