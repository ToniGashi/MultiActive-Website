// import Image from "next/image";
// import parse from "html-react-parser";

// import { SearchCard } from "../../../ui/components/home/SearchCard";
// import NewsletterForm from "~/app/ui/components/common/Newsletter/NewsletterForm";
// import { getBlogById, getBlogContent, getLocationsList } from "../../actions";
// import { redirect } from "next/navigation";
// import { Suspense } from "react";
// import { BlogContentSkeleton, BlogSidebarSkeleton } from "~/app/ui/components/common";
// import { type Metadata } from "next";

// export const metadata: Metadata = {
//   title: 'Blog by ID page',
//   description: 'Read our Blogs here',
// };

// const BlogSidebar = async ({id}: {id: string}) => {
//   const locationsList = (await getLocationsList())!;
//   const currBlog = await getBlogById(id);

//   return (
//     <div className="-m-3 flex-col gap-5 md:mt-24 sticky top-24 h-fit">
//       <div className="flex h-min flex-col items-center justify-center gap-5 rounded-[10px] bg-[#F7F7F7] p-6">
//         <h5 className="text-2xl font-medium">Find your perfect place</h5>
//         <SearchCard size="small" locationsList={locationsList} defaultLocation={currBlog?.relatedLocation} />
//       </div>
//       <div className="mt-5 flex h-min flex-col gap-5 rounded-[10px] bg-[#F7F7F7] p-6">
//         <NewsletterForm isTextBlack={true} />
//         <div className="flex h-[190px] w-full shrink-0 lg:hidden">
//           <Image
//             alt="Blog image"
//             src="/newsletter_img.jpeg"
//             className="rounded-sm"
//             width={460}
//             height={190}
//             style={{
//               objectFit: "cover",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const BlogContent = async ({ params }: { params: { id: string } }) => {

//   const currentBlogsHTML = await getBlogContent(params.id);

//   if (!currentBlogsHTML) {
//     return redirect("/404");
//   }

//   return <>
//   {parse(currentBlogsHTML)}
//   </>
// }

// export default async function Blogpage({ params }: { params: { id: string } }) {

//   return (
//     <main className="flex flex-col">
//       <div className="flex justify-center">
//         <div className="flex max-w-[1220px] flex-col items-center justify-center">
//           <div className="flex-col gap-10 p-10 md:flex lg:grid lg:grid-cols-7">
//               <div className="w-full col-span-5">
//             <Suspense fallback={<BlogContentSkeleton/>}>
//                 <BlogContent params={params} />
//             </Suspense>
//             </div>
//             <div className="col-span-2">
//             <Suspense fallback={<BlogSidebarSkeleton/>}>
//                 <BlogSidebar id={params.id}/>
//             </Suspense>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import React from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // For now, return basic metadata since blog content is not implemented
  return {
    title: `Blog - ${id}`,
    description:
      "Lexoni artikujt tanë të fundit për fitness, wellness dhe jetësë të shëndetshme. Këshilla ekspertësh dhe udhëzime të dobishme.",
    keywords: [
      "blog",
      "artikull",
      "fitness",
      "wellness",
      "shëndet",
      "Multi Active Card",
      "këshilla",
      "udhëzime",
    ],
    openGraph: {
      title: `Blog - Multi Active Card`,
      description:
        "Lexoni artikujt tanë të fundit për fitness, wellness dhe jetësë të shëndetshme.",
      url: `https://multiactivecard.com/blogs/${id}`,
      images: [
        {
          url: "/images/blog-default-og.jpg",
          width: 1200,
          height: 630,
          alt: "Multi Active Card Blog",
        },
      ],
    },
    twitter: {
      title: `Blog - Multi Active Card`,
      description:
        "Lexoni artikujt tanë të fundit për fitness, wellness dhe jetësë të shëndetshme.",
      images: ["/images/blog-default-twitter.jpg"],
    },
  };
}

function Page() {
  return <div>Blog By Id</div>;
}

export default Page;
