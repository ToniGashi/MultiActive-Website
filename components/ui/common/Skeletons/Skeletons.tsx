import { Fragment } from "react";

export function CardSkeleton() {
  return (
    <div
      className={`flex h-full grow-0 animate-pulse flex-col overflow-hidden rounded-xl bg-gray-100 p-1 shadow-sm max-[1280px]:w-[260px] max-[1150px]:w-[240px] max-[1070px]:w-[280px] xl:w-[280px]`}
    >
      <div className="flex h-[210px] items-center justify-center truncate rounded-xl bg-white px-16 py-8" />
      <div className="flex flex-col">
        <div className="mx-2 my-4 flex h-14 grow rounded-md bg-gray-200" />
        <div className="flex gap-4">
          <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
      </div>
    </div>
  );
}

export function FilteredListingSkeleton() {
  return (
    <div
      className={`flex h-[410px] w-full flex-col gap-4 overflow-hidden rounded-md p-1 sm:w-[280px] md:w-[350px]`}
    >
      <div
        className={`h-[330px] w-full rounded-lg  bg-gray-100 p-2 shadow-sm sm:w-[270px] md:w-[350px]`}
      >
        <div className="flex h-[210px] w-full items-center justify-center rounded-xl bg-white py-8" />
        <div className="flex flex-col">
          <div className="mt-3 flex justify-between">
            <div className="m-1 h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
            <div className="m-1 h-4 w-24 rounded-md bg-gray-200 text-sm font-medium sm:w-20" />
          </div>
          <div className="mx-1 my-1 flex h-[52px] grow rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
    </div>
  );
}

export function FeaturedListingsSkeleton() {
  return (
    <section className="no-scrollbar mb-8 flex items-center gap-5 overflow-auto will-change-scroll sm:flex-row sm:flex-wrap sm:justify-between">
      <div className="flex justify-evenly gap-4">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((skeleton) => {
          return <CardSkeleton key={skeleton} />;
        })}
      </div>
    </section>
  );
}

export function AllListingsSkeleton() {
  return (
    <div className="no-scrollbar flex grow items-center gap-5 overflow-auto will-change-scroll sm:flex-row sm:flex-wrap sm:justify-between">
      {Array.from({ length: 8 }, (_, i) => i + 1).map((skeleton) => {
        return (
          <div key={skeleton} className="h-[340px]">
            <CardSkeleton />
          </div>
        );
      })}
    </div>
  );
}

export function FilteredListingsSkeleton() {
  return (
    <>
      Searching for listings close to your filters...
      <div className="flex animate-pulse gap-6 py-5">
        <div className="h-6 w-60 bg-gray-100" />
        <div className="h-4 w-12 bg-gray-100" />
      </div>
      <div className="flex animate-pulse flex-wrap items-center justify-center gap-5 xl:justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((skeleton) => {
          return <FilteredListingSkeleton key={skeleton} />;
        })}
      </div>
    </>
  );
}

export function MapSkeleton() {
  return <div className="sticky right-0 top-0 h-screen bg-gray-100" />;
}

export function FiltersSkeleton() {
  return (
    <div className=" mb-5 grid animate-pulse grid-cols-3 gap-4 sm:grid-cols-4">
      <div className="col-span-2 sm:col-span-2 min-[1100px]:col-span-1">
        <div className="flex h-8 w-60 rounded-full bg-gray-100" />
      </div>
      <div className="col-span-1 md:hidden">
        <div className="border-1 flex rounded-3xl bg-white shadow-xl">
          <div className={`flex-1 rounded-3xl bg-gray-100 p-2 pl-3`} />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 min-[1100px]:col-span-1">
        <div className="flex h-8 w-full rounded-full bg-gray-100" />
      </div>
      <div className="col-span-1 sm:col-span-2 min-[1100px]:col-span-1">
        <div className="flex h-8 w-full rounded-full bg-gray-100" />
      </div>
      <div className="col-span-1 sm:col-span-2 min-[1100px]:col-span-1">
        <div className="flex h-8 w-full rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
export function PopularCategoriesSkeleton() {
  return (
    <div className="no-scrollbar flex animate-pulse justify-between gap-5 overflow-auto will-change-scroll md:justify-between md:gap-0">
      {Array.from({ length: 7 }, (_, i) => i + 1).map((skeleton) => {
        return (
          <Fragment key={skeleton}>
            <div
              className={`hidden rounded-full lg:flex lg:h-12 lg:w-32 lg:bg-gray-100`}
            />
            <div className="mb-7 flex snap-start flex-col items-center gap-x-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 p-3" />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export function BookedListingCardSkeleton() {
  return (
    <div
      className={`flex h-[136px] w-full animate-pulse gap-6 rounded-xl border border-[#EAEAEF] p-3`}
    >
      <div className="flex h-[112px] w-[138px] rounded-lg bg-gray-100" />
      <div className="flex gap-16">
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Dates</div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-[74px] rounded bg-gray-100" /> -
            <div className="h-4 w-[74px] rounded bg-gray-100" />
          </div>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Guests</div>
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Room type</div>
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function PricingDetailsSkeleton() {
  const rows = 5;
  const cols = 2;
  return (
    <div className="flex h-[210px] w-full animate-pulse flex-col gap-3 p-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-5">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="h-7 w-full rounded-lg bg-gray-100" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PersonalInformationSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-[280px] bg-gray-100" />
      <div className="mt-12 flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-10">
            <div className="h-[80px] w-[80px] rounded-full bg-gray-100" />
            <div className="flex flex-col">
              <div className="h-[22px] w-[120px] bg-gray-100" />
              <div className="mt-4 rounded-full border bg-gray-100 px-12 py-7" />
            </div>
          </div>
        </div>
        <div className="mb-8 flex flex-col">
          <div className="my-10 flex flex-col gap-5">
            {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => {
              return (
                <div className="flex w-full gap-5" key={i}>
                  <div className="relative w-[300px]">
                    <div className="mb-1 block h-[22px] w-[120px] bg-gray-100" />
                    <div className="h-[40px] w-[300px] bg-gray-100" />
                  </div>
                  <div className="relative w-[300px]">
                    <div className="mb-1 block h-[22px] w-[120px] bg-gray-100" />
                    <div className="h-[40px] w-[300px] bg-gray-100" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[200px] rounded-full border bg-gray-100 px-12 py-6 text-[#676D73]" />
        </div>
      </div>
    </div>
  );
}

export function BlogSidebarSkeleton() {
  return (
    <div className="-m-3 h-[45vh] w-[17vw] animate-pulse flex-col gap-5 md:mt-24">
      <div className="flex h-min flex-col items-center justify-center gap-5 rounded-[10px] bg-gray-100 p-6">
        <div className="h-8 w-[200px] bg-gray-200" /> {/* Title Placeholder */}
        <div className="h-[300px] w-full bg-gray-200" />{" "}
        {/* SearchCard Placeholder */}
      </div>
      <div className="mt-5 flex h-min flex-col gap-5 rounded-[10px] bg-gray-100 p-6">
        <div className="h-[60px] w-full bg-gray-200" />{" "}
        {/* NewsletterForm Placeholder */}
        <div className="flex h-[190px] w-full rounded-sm bg-gray-200" />{" "}
        {/* Image Placeholder */}
      </div>
    </div>
  );
}

export function BlogContentSkeleton() {
  return (
    <div className="flex w-[30vw] animate-pulse flex-col gap-10">
      <div className="flex flex-col gap-5">
        {/* Featured Tag */}
        <div className="flex h-[33px] w-[80px] shrink-0 rounded-[64px] bg-gray-200" />

        {/* Title and Date */}
        <div className="flex flex-col gap-3">
          <div className="h-[32px] w-full bg-gray-200" />
          <div className="h-[20px] w-[150px] bg-gray-200" />
        </div>

        {/* First Image */}
        <div className="h-[200px] w-full bg-gray-200" />

        {/* Paragraphs and Subheadings */}
        <div className="flex flex-col gap-3">
          <div className="h-[20px] w-[90%] bg-gray-200" />
          <div className="h-[40px] w-[200px] bg-gray-200" />
          <div className="h-[20px] w-[85%] bg-gray-200" />
        </div>

        {/* List Items */}
        <div className="flex flex-col gap-3 px-16">
          <div className="h-[24px] w-[200px] bg-gray-200" />
          <div className="h-[20px] w-full bg-gray-200" />
          <div className="h-[20px] w-[90%] bg-gray-200" />

          <div className="h-[24px] w-[200px] bg-gray-200" />
          <div className="h-[20px] w-full bg-gray-200" />
          <div className="h-[20px] w-[90%] bg-gray-200" />
        </div>

        {/* Second Image */}
        <div className="h-[200px] w-full bg-gray-200" />

        {/* More Subheadings and Paragraphs */}
        <div className="flex flex-col gap-3">
          <div className="h-[40px] w-[200px] bg-gray-200" />
          <div className="h-[20px] w-[90%] bg-gray-200" />
        </div>

        {/* Additional List Items */}
        <div className="flex flex-col gap-3 px-16">
          <div className="h-[24px] w-[200px] bg-gray-200" />
          <div className="h-[20px] w-full bg-gray-200" />
          <div className="h-[20px] w-[90%] bg-gray-200" />

          <div className="h-[24px] w-[200px] bg-gray-200" />
          <div className="h-[20px] w-full bg-gray-200" />
          <div className="h-[20px] w-[90%] bg-gray-200" />
        </div>

        {/* Third Image */}
        <div className="h-[200px] w-full bg-gray-200" />

        {/* Final Paragraphs */}
        <div className="flex flex-col gap-3">
          <div className="h-[20px] w-[90%] bg-gray-200" />
          <div className="h-[20px] w-[85%] bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function StaticPageWrapperSkeleton() {
  return (
    <main className="flex flex-col">
      <div className="relative -mt-24 flex h-[588px]">
        <div className="absolute flex h-[588px] w-full animate-pulse bg-gray-100" />
      </div>
      <div className="my-5 flex justify-center sm:my-16">
        <div className="custom-max-widths items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="absolute top-32 animate-pulse text-white md:top-44">
              <div className="flex w-full justify-center">
                <div className="w-full text-center">
                  <div className="mb-8 h-[80px] rounded-full bg-gray-300" />
                  <div className="h-[30px] rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex animate-pulse flex-col gap-4 p-3 text-justify text-[#676D73] sm:gap-8 sm:p-0">
            <div className="h-[30px] rounded-full bg-gray-200" />
            <div className="space-y-4">
              <div className="h-[20px] rounded-full bg-gray-200" />
              <div className="h-[20px] rounded-full bg-gray-200" />
              <div className="h-[20px] rounded-full bg-gray-200" />
            </div>
            <div className="h-[20px] rounded-full bg-gray-200" />
            <div className="h-[20px] rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
export function AllBlogsSkeleton() {
  return (
    <div className="flex w-full max-w-[1220px] animate-pulse flex-col items-center justify-center">
      {/* Featured Blog Skeleton */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-20">
        <div className="flex max-w-full flex-col gap-5 md:max-w-[50%]">
          <div className="h-6 w-[80px] rounded bg-gray-100" />{" "}
          {/* CustomChip Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="h-10 w-[200px] rounded bg-gray-100 md:h-[67px] md:w-[300px]" />{" "}
            {/* Title Skeleton */}
            <div className="h-4 w-full rounded bg-gray-100 md:h-[30px]" />{" "}
            {/* Description Skeleton */}
            <div className="h-4 w-[160px] rounded bg-gray-100" />{" "}
            {/* Button Skeleton */}
          </div>
        </div>
        <div className="flex w-full md:w-auto">
          <div className="hidden h-[370px] w-[530px] rounded-2xl bg-gray-100 md:inline-block" />{" "}
          {/* Image Skeleton */}
        </div>
      </div>

      {/* Blogs Grid Skeleton */}
      <div className="mt-10 grid w-full grid-cols-1 gap-6 py-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-[#EAEAEF] p-4"
          >
            <div className="h-[200px] w-full rounded bg-gray-100" />{" "}
            {/* Image Skeleton */}
            <div className="h-6 w-[70%] rounded bg-gray-100" />{" "}
            {/* Title Skeleton */}
            <div className="h-4 w-[50%] rounded bg-gray-100" />{" "}
            {/* Subtitle Skeleton */}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SimilarCardsSkeleton() {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-3 rounded-lg border border-[#EAEAEF] p-4"
        >
          <div className="h-[200px] w-full rounded bg-gray-100" />{" "}
          {/* Image Skeleton */}
          <div className="h-6 w-[70%] rounded bg-gray-100" />{" "}
          {/* Title Skeleton */}
          <div className="h-4 w-[50%] rounded bg-gray-100" />{" "}
          {/* Subtitle Skeleton */}
        </div>
      ))}
    </div>
  );
}
