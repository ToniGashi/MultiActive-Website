"use client";

import Image from "next/image";
import { IconGenerator, CustomChip } from "@/components/ui/common";

const partners = [
  "airbnb",
  "booking",
  "expedia",
  "google",
  "tripadvisor",
  "vrbo",
];

// const storyData = [
//   {
//     name: "Listed Properties",
//     icon: <OpenFolderIcon color="text-primary" />,
//     value: "1.5k",
//   },
//   {
//     name: "Happy Customers",
//     icon: <UserGroupIcon color="text-primary" />,
//     value: "2.5k",
//   },
//   {
//     name: "Star Reviews",
//     icon: <DownloadIcon color="text-primary" />,
//     value: "5 ★",
//   },
//   {
//     name: "Daily Transactions",
//     icon: <GlobeIcon color="text-primary" />,
//     value: "450",
//   },
// ];

export default function AboutUsClientPage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="custom-max-widths items-center justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="absolute top-32 text-white md:top-44">
              <div className="flex justify-center">
                <div className="w-full text-center">
                  <h1 className="mb-4 text-4xl font-medium leading-[50px] tracking-tight sm:mb-8 sm:text-[80px] sm:leading-[80px]">
                    Mirë se vine tek Multi Active!
                  </h1>
                  <h6 className="mx-10 text-lg leading-7 sm:mx-40 sm:text-xl sm:leading-[30px] lg:mx-60">
                    Tek Multi Active ne ofrojmë akses në aktivitete fizike dhe
                    përfitime shëndetësore, duke nxitur mirëqenien dhe
                    produktivitetin e stafit tuaj.
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full items-center">
            <div className="mt-20">
              <div className="flex flex-col-reverse items-center justify-center gap-8 lg:flex-row">
                <div className="shrink-0 lg:flex lg:h-[420px]">
                  <Image
                    alt="Coolvacay about us, second image"
                    src="/about_us_2.jpg"
                    className="rounded-2xl"
                    quality={80}
                    width={452}
                    height={420}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                  <h2 className="md:leading-80 text-center text-[32px] leading-[47px] sm:font-semibold md:text-[46px] lg:text-left">
                    Kush Jemi Ne
                  </h2>
                  <p className="text-center text-base leading-6 text-[#676D73] sm:leading-7 lg:text-left lg:text-lg">
                    Ne jemi një ekip i përkushtuar për të ndihmuar kompanitë të
                    krijojnë mjedise pune më të lumtura dhe produktive. Me një
                    fokus të veçantë në mirëqenien e punonjësve, ne ofrojmë
                    zgjidhje inovative që përfshijnë aktivitete fizike,
                    përfitime shëndetësore dhe programe motivuese të përshtatura
                    për nevojat unike të çdo organizate.
                  </p>
                  <div className="mt-8 grid grid-cols-3 items-center justify-items-center gap-4 sm:gap-8 lg:justify-items-start">
                    {/* {partners.map((partner) => (
                      <IconGenerator
                        key={partner}
                        src={`/${partner}_logo.svg`}
                        alt={`${partner} logo`}
                        width="auto"
                      />
                    ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-16 sm:mt-[128px] w-full">
        <div className="flex justify-center bg-[#FAFAFA] px-4 py-16 sm:px-0">
          <div className="custom-max-widths flex flex-col items-center justify-center gap-12 xl:flex-row xl:gap-24">
            <div className="flex flex-col gap-8 w-1/3">
              <h1 className="text-2xl font-bold leading-8 sm:text-[40px] sm:leading-10 text-[#030712]">
                Pse Na Besojnë Klientët
              </h1>
              <p className="text-center text-base leading-6 sm:leading-7 lg:text-left lg:text-lg text-[#676D73]">
                Klientët tanë na zgjedhin sepse ne nuk ofrojmë vetëm zgjidhje,
                por krijojmë partneritete të qëndrueshme. Platforma jonë
                moderne, qasja e personalizuar dhe përkushtimi për të rritur
                performancën dhe kënaqësinë afatgjatë janë shtyllat kryesore që
                na veçojnë në treg.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-8 md:gap-2 lg:gap-4">
                {/* {storyData.map((data) => (
                  <InfoCard
                    key={data.name}
                    icon={data.icon}
                    value={data.value}
                    name={data.name}
                  />
                ))} */}
              </div>
            </div>
            <div className="flex h-[320px] w-full shrink-0 sm:h-[537px] md:w-[542px]">
              <Image
                alt="Coolvacay about us, third image"
                src="/about_us_3.jpg"
                className="rounded-2xl"
                width={542}
                height={537}
                priority={true}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-14 flex justify-center px-4 sm:px-0">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-bold sm:text-[40px]">
            Here is what people say about us
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aboutUsConfigs.reviews.map((review, index) => {
              return (
                <ReviewCard
                  key={index}
                  title={review.title}
                  description={review.description}
                  size={index === 1 ? "medium" : "small"}
                  name={review.author}
                  date={review.date}
                />
              );
            })}
          </div>
          <div className="my-16 w-full">
            <Newsletter />
          </div>
        </div>
      </div> */}
    </>
  );
}
