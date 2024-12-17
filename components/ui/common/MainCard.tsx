"use client";
import Image from "next/image";
export function MainCard({
  isBlogCard,
  name,
  subtitle,
  imageUrl,
}: {
  isBlogCard: boolean;
  name: string;
  subtitle: string;
  imageUrl?: string;
}) {
  return (
    <div
      className={`${
        !isBlogCard && "shadow-cardShadow"
      } flex h-full grow-0 flex-col overflow-hidden rounded-xl max-[1280px]:w-[260px] max-[1150px]:w-[240px] max-[1070px]:w-[280px] xl:w-[280px]`}
      style={{
        border: !isBlogCard ? "1px solid rgba(173, 181, 189, 0.70)" : "",
      }}
    >
      <div className="flex h-[210px] w-[278px]">
        <Image
          src={imageUrl ?? "/cardImage.png"}
          width={278}
          height={210}
          alt="CoolVacay listing image"
          className="h-[210px] w-auto"
          style={{
            width: isBlogCard ? "278px" : "auto",
            objectFit: "cover",
            borderRadius: isBlogCard ? 10 : 0,
          }}
        />
      </div>
      <div
        className={`${
          !isBlogCard && "px-2"
        } flex grow flex-col justify-between`}
      >
        <div className="pb-3 pt-2">
          <div className="mb-1 text-sm font-medium">{name}</div>
          <p className="text-sm text-[#676D73]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
