import { type Metadata } from "next";
import { TelephoneIcon } from "@/public/TelephoneIcon";
import { MessageIcon } from "@/public/MessageIcon";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us Page",
};

export default async function Page() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center px-4 sm:px-0">
        <div className="custom-max-widths flex min-h-[640px] flex-col items-center justify-center">
          <div className="flex w-full flex-col lg:flex-row">
            <div className="h-full w-full flex justify-center px-6 py-10 sm:px-14 sm:py-14 ">
              <div className="w-7/12">
                <h2 className="text-2xl text-primary sm:text-3xl">
                  Si mund t'ju ndihmojmë?
                </h2>
                <h6 className="my-4 text-base text-[#676D73] sm:text-lg">
                  {`Keni ndonjë pyetje ose sugjerim? Ju lutem na kontaktoni në metodat e kontaktit më poshtë edhe do perpiqemi t'ju pergjigjemi sa më shpejtë të jetë e mundur.`}
                </h6>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full">
            <div className="flex items-center justify-around gap-5 rounded-[8px] p-6 sm:gap-10 sm:p-10">
              <div className="flex gap-5">
                <div className="h-min rounded-full bg-primary/[0.10] p-5">
                  <TelephoneIcon color={"text-primary"} />
                </div>
                <div className="flex flex-col justify-around gap-3">
                  <p className="text-[18px] font-medium text-primary sm:text-[20px]">
                    Na shkruani ose telefononi
                  </p>
                  <p className="text-sm sm:text-base">
                    Ky është numri ynë i telefonit: 069213111
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="h-min rounded-full bg-primary/[0.10] p-5">
                  <MessageIcon color={"text-primary"} />
                </div>
                <div className="flex flex-col justify-around gap-3">
                  <p className="text-[18px] font-medium text-primary sm:text-[20px]">
                    Na shkruani në email
                  </p>
                  <p className="text-sm sm:text-base">
                    Ky është emaili yne: toni@gmail.com
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-5 rounded-[8px] bg-[#F7F7F7] p-6 sm:gap-10 sm:p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <IconGenerator
                  src="/message_icon.svg"
                  alt="Message for assistance icon"
                  width="36px"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] font-medium text-primary sm:text-[20px]">
                  Chat
                </p>
                <p className="text-sm sm:text-base">
                  Our support team is available to answer your questions, and
                  provide technical help.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
