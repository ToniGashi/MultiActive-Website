import { Suspense } from "react";
import AllBlogs from "./AllBlogs";
import { AllBlogsSkeleton } from "@/components/ui/common/Skeletons/Skeletons";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lexoni artikujt tanë të fundit për fitness, wellness, shëndet dhe jetësë të shëndetshme. Këshilla ekspertësh, udhëzime dhe informacione të dobishme për t'ju ndihmuar në udhëtimin tuaj për një jetësë më të mirë.",
  keywords: [
    "blog Multi Active Card",
    "fitness blog",
    "wellness blog",
    "shëndet",
    "këshilla fitnessi",
    "jetësë e shëndetshme",
    "stërvitje",
    "nutricion",
    "wellness tips",
    "lifestyle",
    "artikuj shëndeti",
    "udhëzime fitnessi",
  ],
  openGraph: {
    title: "Blog - Multi Active Card",
    description:
      "Lexoni artikujt tanë të fundit për fitness, wellness dhe jetësë të shëndetshme. Këshilla ekspertësh dhe udhëzime të dobishme.",
    url: "https://multiactivecard.com/blogs",
    images: [
      {
        url: "/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Multi Active Card Blog",
      },
    ],
  },
  twitter: {
    title: "Blog - Multi Active Card",
    description:
      "Lexoni artikujt tanë të fundit për fitness, wellness dhe jetësë të shëndetshme.",
    images: ["/images/blog-twitter.jpg"],
  },
};

async function Page() {
  return (
    <main className="flex w-full flex-col">
      <div className="flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<AllBlogsSkeleton />}>
          <AllBlogs />
        </Suspense>
      </div>
    </main>
  );
}

export default Page;
