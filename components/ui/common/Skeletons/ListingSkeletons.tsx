export function BreadcrumbSkeleton() {
  return (
    <div className="mb-1 block animate-pulse">
      <div className="flex gap-6">
        <div className="h-6 w-24 rounded-md  bg-gray-100" />
        <div className="h-6 w-32 rounded-md bg-gray-100" />
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <>
      <div className="hidden h-[470px] w-full animate-pulse grid-cols-4 grid-rows-2 gap-5 md:flex md:grid">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => {
          return (
            <div
              key={index}
              className={`${index === 1 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} h-full w-full rounded-[8px]  bg-gray-100`}
            >
              <div className="max-h-[500px] w-[640px]" />
            </div>
          );
        })}
      </div>
      <div className="flex h-[300px] w-full bg-gray-100 md:hidden" />
    </>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="max-w-[800px]">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="w-full animate-pulse">
        <div className="mt-4 h-[144px] bg-gray-100"></div>
        <div className="mt-2 h-4 w-16 rounded-md  bg-gray-100" />
        <div className="my-10 grid grid-cols-3">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((index) => {
            return (
              <div key={index} className="my-1 flex items-center gap-2">
                <div
                  key={index}
                  className="rounded-medium h-5 w-5 bg-gray-100"
                />
                <div className="h-5 w-40 bg-gray-100 font-medium" />
              </div>
            );
          })}
        </div>
        <div className="h-60 w-full bg-gray-100" />
      </div>
    </div>
  );
}

export function BookItNowSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <div
        className={`flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5`}
      >
        <div className="flex justify-between">
          <h2>Choose your preferred day</h2>
          <h3 className="font-medium text-primary">View calendar</h3>
        </div>
        <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
          <div
            className="relative px-6 py-5"
            style={{ borderBottom: "1px solid #EAEAEF" }}
          >
            <div className="h-[180px] w-full bg-gray-100" />
          </div>
        </div>
        <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
        <hr />
        <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
      </div>
    </div>
  );
}

export function PricingDetailsCardSkeleton() {
  return (
    <div className="flex w-full max-w-[420px] shrink-0 flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <div className="flex w-[420px] animate-pulse flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5">
        <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
          <div
            className="relative px-6 py-5"
            style={{ borderBottom: "1px solid #EAEAEF" }}
          >
            <div className="h-[180px] w-full bg-gray-100" />
          </div>
        </div>
        <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
        <hr />
        <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
      </div>
    </div>
  );
}
