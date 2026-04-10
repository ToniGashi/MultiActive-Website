import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

const posts = [
  {
    id: 1,
    title: "Pse aktiviteti fizik rregullisht ndikon në energjinë tuaj",
    excerpt:
      "Një përmbledhje e shkurtër se si stërvitja e moderuar lidhet me mirëqenien dhe produktivitetin në punë dhe në jetën e përditshme.",
    date: "2025-01-15T10:00:00",
    readTime: "4 min",
    featured: true,
    image: "/brand/hero-competition.png",
  },
  {
    id: 2,
    title: "Wellness në punë: ku të filloni pa komplikime",
    excerpt:
      "Hapa të thjeshtë për kompani që duan të mbështesin shëndetin e ekipit pa programe të rënda buxheti.",
    date: "2025-02-02T10:00:00",
    readTime: "3 min",
    featured: false,
    image: "/about_us_3.jpg",
  },
  {
    id: 3,
    title: "Si të zgjidhni qendrën e duhur fitness për stilin tuaj",
    excerpt:
      "Çfarë të shikoni kur keni një kartë që ju lejon të vizitoni disa lokacione: oraret, shërbimet dhe komuniteti.",
    date: "2025-02-20T10:00:00",
    readTime: "5 min",
    featured: false,
    image: "/brand/training-rope-climb.png",
  },
];

export default function AllBlogs() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-12 px-4 pb-8 sm:px-6 lg:px-8">
      {featured && (
        <article className="overflow-hidden rounded-3xl border border-white/10 bg-card/90 shadow-[0_0_48px_-20px_rgba(59,130,246,0.18)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row md:gap-0">
            <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-1/2 md:min-h-[280px]">
              <Image
                src={featured.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:w-1/2 md:p-10">
              <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                I veçantë
              </span>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {featured.title}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                <time dateTime={featured.date}>
                  {dayjs(featured.date).format("D MMMM YYYY")}
                </time>
                <span aria-hidden>·</span>
                <span>{featured.readTime} lexim</span>
              </div>
              <Link
                href={`/blogs/${featured.id}`}
                className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Lexo më shumë
              </Link>
            </div>
          </div>
        </article>
      )}

      <div>
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Artikuj të tjerë
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {rest.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blogs/${post.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/90 transition-all hover:border-primary/30 hover:shadow-[0_0_36px_-12px_rgba(59,130,246,0.25)]"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={post.date}
                  >
                    {dayjs(post.date).format("D MMM YYYY")} · {post.readTime}
                  </time>
                  <h3 className="font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
