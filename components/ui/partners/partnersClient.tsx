"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IPartner } from "./types";
import { Card, CardContent } from "./card";
function PartnersClient({ partnerData }: { partnerData: IPartner }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const displayedImages = partnerData.images.slice(0, 5);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <ImageGallery images={displayedImages} onImageClick={setSelectedImage} />
      <div className="text-center my-16">
        <ActionButton onClick={() => setSelectedImage(0)}>
          View All Images
        </ActionButton>
      </div>
      <PartnerDetails
        address={partnerData.address}
        city={partnerData.city}
        country={partnerData.country}
        openTime={partnerData.openTime}
        closeTime={partnerData.closeTime}
        dayOffs={partnerData.dayOffs}
      />
      {selectedImage !== null && (
        <FullScreenGallery
          images={partnerData.images}
          selectedIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

function FullScreenGallery({
  images,
  selectedIndex,
  onClose,
}: {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setDirection("prev");
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setDirection("next");
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  const goToNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close gallery"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative w-full max-w-5xl aspect-video overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${
              direction === "next"
                ? "animate-slide-left"
                : direction === "prev"
                ? "animate-slide-right"
                : ""
            }`}
          >
            <Image src={image} alt={image} fill className="object-contain" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        <p className="text-xl font-semibold">{images[currentIndex]}</p>
      </div>
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

function ImageGallery({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) {
  return (
    <div
      className={`grid gap-4 ${
        images.length === 1
          ? "grid-cols-1" // Single image layout
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1" // Multiple images layout
      }`}
    >
      {/* Large Image */}
      <div className="relative rounded-lg sm:col-span-2 sm:row-span-1">
        <ImageCard
          image={images[0]}
          index={0}
          onClick={onImageClick}
          className="h-full"
        />
      </div>

      {/* Four Small Images - Only shown if there are more than 1 image */}
      {images.length > 1 && (
        <div className="grid gap-4 grid-cols-2 grid-rows-2 sm:col-span-2">
          {images.slice(1).map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              index={index + 1}
              onClick={onImageClick}
              className="aspect-square"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ImageCard({
  image,
  index,
  onClick,
  className,
}: {
  image: string;
  index: number;
  onClick: (index: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer ${className}`}
      onClick={() => onClick(index)}
    >
      <Image
        src={image}
        alt={`Image ${index}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-end">
        <p className="text-white p-4 font-semibold opacity-0 hover:opacity-100 transition-opacity">
          {image}
        </p>
      </div>
    </div>
  );
}

function WorkingHoursCard({
  openTime,
  closeTime,
  dayOffs,
}: {
  openTime: string;
  closeTime: string;
  dayOffs: string[];
}) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold pb-4">Working Hours</h2>
        <ul className="space-y-2">
          {days.map((day, index) =>
            dayOffs.includes(day) ? null : (
              <li key={index} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span className="text-gray-600">
                  {openTime} - {closeTime}
                </span>
              </li>
            )
          )}
        </ul>
      </CardContent>
    </Card>
  );
}

function AddressCard({
  address,
  city,
  country,
}: {
  address: string;
  city: string;
  country: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Address</h2>
          <p className="text-gray-600 pb-4">{address}</p>
          <h2 className="text-2xl font-semibold">City</h2>
          <p className="text-gray-600 pb-4">{city}</p>
          <h2 className="text-2xl font-semibold">Address</h2>
          <p className="text-gray-600">{country}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PartnerDetails({
  address,
  city,
  country,
  openTime,
  closeTime,
  dayOffs,
}: {
  address: string;
  city: string;
  country: string;
  openTime: string;
  closeTime: string;
  dayOffs: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <WorkingHoursCard
        openTime={openTime}
        closeTime={closeTime}
        dayOffs={dayOffs}
      />
      <AddressCard address={address} city={city} country={country} />
    </div>
  );
}

function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-[#5e62e6] text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
    >
      {children}
    </button>
  );
}

export default PartnersClient;
