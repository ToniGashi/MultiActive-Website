"use client";

import Image from "next/image";

export default function AboutUsClientPage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="custom-max-widths items-center justify-center px-4 sm:px-8 lg:px-16">
          {/* Hero Section */}
          <div className="flex w-full items-center justify-center">
            <div className="absolute top-20 text-white md:top-32 lg:top-44">
              <div className="flex justify-center">
                <div className="w-full text-center">
                  <h1 className="mb-4 text-3xl font-medium leading-[40px] tracking-tight sm:mb-8 sm:text-6xl sm:leading-[70px] lg:leading-[80px]">
                    Mirë se vine tek Multi Active!
                  </h1>
                  <h6 className="mx-4 text-base leading-6 sm:mx-20 sm:text-lg sm:leading-8 lg:mx-40 lg:text-xl lg:leading-[30px]">
                    Tek Multi Active ne ofrojmë akses në aktivitete fizike dhe
                    përfitime shëndetësore, duke nxitur mirëqënien dhe
                    produktivitetin e stafit tuaj.
                  </h6>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full items-center">
            <div className="mt-20">
              <div className="flex flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:gap-12">
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
                <div className="flex flex-col gap-4 lg:w-1/2">
                  <h2 className="text-center text-2xl font-semibold leading-[36px] sm:text-4xl sm:leading-[50px] lg:text-left lg:text-5xl">
                    Kush Jemi Ne
                  </h2>
                  <p className="text-center text-base leading-6 text-[#676D73] sm:leading-7 lg:text-left lg:text-lg">
                    Ne jemi një ekip i përkushtuar për të ndihmuar kompanitë të
                    krijojnë mjedise pune më të lumtura dhe produktive. Me një
                    fokus të veçantë në mirëqënien e punonjësve, ne ofrojmë
                    zgjidhje inovative që përfshijnë aktivitete fizike,
                    përfitime shëndetësore dhe programe motivuese të përshtatura
                    për nevojat unike të çdo organizate.
                  </p>
                  <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-3 lg:justify-items-start">
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

          {/* Why Clients Trust Us Section */}
          <div className="relative mt-16 sm:mt-[128px] w-full">
            <div className="flex justify-center bg-[#FAFAFA] rounded-3xl px-4 py-16 sm:px-8 lg:px-16">
              <div className="custom-max-widths flex flex-col items-center justify-center gap-12 xl:flex-row xl:gap-24">
                <div className="flex flex-col gap-8 xl:w-1/2">
                  <h1 className="text-center text-2xl text-[#030712] font-bold leading-8 sm:text-4xl sm:leading-10 lg:text-left">
                    Pse Na Besojnë Klientët
                  </h1>
                  <p className="text-center text-base leading-6 text-[#676D73] sm:leading-7 lg:text-left lg:text-lg">
                    Klientët tanë na zgjedhin sepse ne nuk ofrojmë vetëm
                    zgjidhje, por krijojmë partneritete të qëndrueshme.
                    Platforma jonë moderne, qasja e personalizuar dhe
                    përkushtimi për të rritur performancën dhe kënaqësinë
                    afatgjatë janë shtyllat kryesore që na veçojnë në treg.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:gap-4">
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
        </div>
      </div>
    </>
  );
}
