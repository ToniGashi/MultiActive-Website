"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  X,
} from "lucide-react";
import { IPartner } from "./types";
import { cn } from "@/lib/utils";

const DAY_LABELS: Record<string, string> = {
  Monday: "E hënë",
  Tuesday: "E martë",
  Wednesday: "E mërkurë",
  Thursday: "E enjte",
  Friday: "E premte",
  Saturday: "E shtunë",
  Sunday: "E diel",
};

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function PartnersClient({ partnerData }: { partnerData: IPartner }) {
  const partnerName = partnerData.name;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const displayedImages = partnerData.images.slice(0, 5);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${partnerData.address}, ${partnerData.city}, ${partnerData.country}`,
  )}`;

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
      <motion.section
        initial={false}
        className="mb-14 md:mb-20"
        aria-labelledby="partner-gallery-heading"
      >
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="partner-gallery-heading"
              className="text-3xl font-black tracking-tight text-white md:text-4xl"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                Pamje nga vendi
              </span>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-zinc-500 md:text-base">
              Klikoni për të hapur galerinë e plotë me efekt kinematografik.
            </p>
          </div>
        </div>

        <BentoGallery
          images={displayedImages}
          partnerName={partnerName}
          onImageClick={setSelectedImage}
        />
      </motion.section>

      <div className="mb-14 flex flex-wrap items-center justify-center gap-3 md:mb-20 md:gap-4">
        <GlowButton onClick={() => setSelectedImage(0)} icon={<Camera className="h-4 w-4" />}>
          Galeria e plotë
        </GlowButton>
        {partnerData.phone ? (
          <GlowButton
            as="a"
            href={`tel:${partnerData.phone.replace(/\s/g, "")}`}
            icon={<Phone className="h-4 w-4" />}
          >
            Telefono
          </GlowButton>
        ) : null}
        {partnerData.website ? (
          <GlowButton
            as="a"
            href={partnerData.website}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            Faqja web
          </GlowButton>
        ) : null}
        <GlowButton
          as="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          icon={<Navigation className="h-4 w-4" />}
        >
          Hap në hartë
        </GlowButton>
      </div>

      <PartnerDetails
        address={partnerData.address}
        city={partnerData.city}
        country={partnerData.country}
        openTime={partnerData.openTime}
        closeTime={partnerData.closeTime}
        dayOffs={partnerData.dayOffs}
        mapsUrl={mapsUrl}
      />

      <AnimatePresence mode="wait">
        {selectedImage !== null && (
          <FullScreenGallery
            images={partnerData.images}
            partnerName={partnerName}
            selectedIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function GlowButton({
  children,
  onClick,
  icon,
  as,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}) {
  const className = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-zinc-100 shadow-[0_0_24px_-8px_rgba(59,130,246,0.45)] backdrop-blur-md transition-all",
    "hover:border-primary/50 hover:bg-primary/15 hover:text-white hover:shadow-[0_0_32px_-6px_rgba(59,130,246,0.55)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506]",
  );

  if (as === "a" && href) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {icon}
      {children}
    </button>
  );
}

function BentoGallery({
  images,
  partnerName,
  onImageClick,
}: {
  images: string[];
  partnerName: string;
  onImageClick: (index: number) => void;
}) {
  const reduceMotion = useReducedMotion();

  if (images.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-white/15 py-16 text-center text-zinc-500">
        Nuk ka foto të disponueshme.
      </p>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 380, damping: 28 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        "grid gap-3 md:gap-4",
        images.length === 1 && "grid-cols-1",
        images.length === 2 && "grid-cols-1 sm:grid-cols-2",
        images.length > 2 && "grid-cols-2 md:grid-cols-4 md:grid-rows-2",
      )}
    >
      {images.length > 2 && (
        <motion.div variants={item} className="col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]">
          <BentoTile
            image={images[0]}
            index={0}
            partnerName={partnerName}
            onClick={onImageClick}
            className="h-full min-h-[280px] md:min-h-[420px]"
            featured
          />
        </motion.div>
      )}

      {images.length === 1 && (
        <motion.div variants={item}>
          <BentoTile
            image={images[0]}
            index={0}
            partnerName={partnerName}
            onClick={onImageClick}
            className="min-h-[320px] md:min-h-[440px]"
            featured
          />
        </motion.div>
      )}

      {images.length === 2 &&
        images.map((image, index) => (
          <motion.div key={image + index} variants={item}>
            <BentoTile
              image={image}
              index={index}
              partnerName={partnerName}
              onClick={onImageClick}
              className="min-h-[240px] md:min-h-[320px]"
            />
          </motion.div>
        ))}

      {images.length > 2 &&
        images.slice(1).map((image, index) => (
          <motion.div key={image + index} variants={item}>
            <BentoTile
              image={image}
              index={index + 1}
              partnerName={partnerName}
              onClick={onImageClick}
              className="min-h-[140px] md:aspect-auto md:min-h-0"
            />
          </motion.div>
        ))}
    </motion.div>
  );
}

function BentoTile({
  image,
  index,
  partnerName,
  onClick,
  className,
  featured,
}: {
  image: string;
  index: number;
  partnerName: string;
  onClick: (index: number) => void;
  className?: string;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      aria-label={`Hap foto ${index + 1}`}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 text-left shadow-lg transition-all duration-500",
        "hover:border-primary/40 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.5)] md:rounded-3xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506]",
        featured && "ring-1 ring-white/5",
        className,
      )}
    >
      <Image
        src={image}
        alt={`${partnerName} — foto ${index + 1}`}
        fill
        sizes={
          featured
            ? "(max-width: 768px) 100vw, 60vw"
            : "(max-width: 768px) 50vw, 25vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050506]/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-full w-full bg-gradient-to-tr from-primary/30 via-transparent to-sky-400/20" />
      </div>
      <span
        className={cn(
          "pointer-events-none absolute font-mono text-[10px] font-bold uppercase tracking-widest text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100",
          featured ? "bottom-5 left-5 md:bottom-6 md:left-6" : "bottom-3 left-3",
        )}
      >
        Zmadho
      </span>
      {featured ? (
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-200 backdrop-blur-md">
          Kryesore
        </div>
      ) : null}
    </button>
  );
}

function FullScreenGallery({
  images,
  partnerName,
  selectedIndex,
  onClose,
}: {
  images: string[];
  partnerName: string;
  selectedIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Galeria e fotove"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#030304]/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-8">
        <p className="font-mono text-sm text-zinc-400">
          <span className="text-primary">{currentIndex + 1}</span>
          <span className="text-zinc-600"> / </span>
          {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
          aria-label="Mbyll galerinë"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
            className="relative aspect-video w-full max-w-5xl"
          >
            <Image
              src={images[currentIndex]}
              alt={`${partnerName} — foto ${currentIndex + 1}`}
              fill
              className="rounded-lg object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-primary/20 md:left-6 md:block"
          aria-label="Fotoja e mëparshme"
        >
          <span className="text-xl">‹</span>
        </button>
        <button
          type="button"
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % images.length)
          }
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-primary/20 md:right-6 md:block"
          aria-label="Fotoja tjetër"
        >
          <span className="text-xl">›</span>
        </button>
      </div>

      <div className="border-t border-white/10 bg-black/30 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-24",
                i === currentIndex
                  ? "border-primary shadow-[0_0_20px_-4px_rgba(59,130,246,0.6)]"
                  : "border-transparent opacity-50 hover:opacity-100",
              )}
              aria-label={`Shiko foto ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PartnerDetails({
  address,
  city,
  country,
  openTime,
  closeTime,
  dayOffs,
  mapsUrl,
}: {
  address: string;
  city: string;
  country: string;
  openTime: string;
  closeTime: string;
  dayOffs: string[];
  mapsUrl: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:p-8"
      >
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Orari i punës</h3>
            <p className="text-xs text-zinc-500">Ditët e hapjes</p>
          </div>
        </div>
        <ul className="relative mt-6 space-y-0">
          {WEEK_DAYS.map((day) =>
            dayOffs.includes(day) ? null : (
              <li
                key={day}
                className="flex items-center justify-between border-b border-white/[0.06] py-3 last:border-0"
              >
                <span className="text-sm font-medium text-zinc-300">
                  {DAY_LABELS[day] ?? day}
                </span>
                <span className="font-mono text-sm tabular-nums text-primary">
                  {openTime} – {closeTime}
                </span>
              </li>
            ),
          )}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.08 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 p-6 md:p-8"
      >
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Ku na gjeni</h3>
            <p className="text-xs text-zinc-500">Adresa e plotë</p>
          </div>
        </div>
        <div className="relative mt-6 space-y-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Rruga
            </p>
            <p className="mt-1 text-lg font-medium leading-snug text-zinc-100">
              {address}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Qyteti
              </p>
              <p className="mt-1 text-zinc-300">{city}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Shteti
              </p>
              <p className="mt-1 text-zinc-300">{country}</p>
            </div>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-sky-300"
          >
            <Navigation className="h-4 w-4" />
            Udhëzime në Google Maps
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default PartnersClient;
