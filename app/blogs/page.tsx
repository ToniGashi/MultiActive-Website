import { Suspense } from "react";
import AllBlogs from "./AllBlogs";
import { AllBlogsSkeleton } from "@/components/ui/common/Skeletons/Skeletons";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs",
  description: "All Blogs Page",
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
