"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Handshake, Mail, ShieldCheck, Users } from "lucide-react";

interface DockMorphProps {
  className?: string;
  items?: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
  }[];
  position?: "bottom" | "top" | "left";
}

const dockBtnClass =
  "shrink-0 rounded-full border-0 !bg-transparent text-white shadow-none transition-colors duration-150 " +
  "hover:!bg-white/10 hover:!text-white " +
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]";

const dockActiveClass =
  "text-primary ring-2 ring-primary ring-offset-0 hover:!bg-primary/15 hover:!text-primary";

export default function DockMorph({
  items,
  className,
  position = "bottom",
}: DockMorphProps) {
  const pathname = usePathname();

  const isActiveHref = (href: string) => {
    const p = pathname ?? "";
    if (href === "/") return p === "/" || p === "";
    return p === href || p.startsWith(`${href}/`);
  };

  const dockItems =
    items && items.length > 0
      ? items
      : [
          { icon: Users, label: "Rreth nesh", href: "/about" },
          { icon: Handshake, label: "Partnere", href: "/partners" },
          { icon: Mail, label: "Kontakt", href: "/contact" },
          { icon: ShieldCheck, label: "Kushte", href: "/terms" },
        ];

  const positionClasses = {
    bottom: "fixed bottom-6 left-1/2 -translate-x-1/2",
    top: "fixed top-6 left-1/2 -translate-x-1/2",
    left: "fixed left-6 top-1/2 -translate-y-1/2 flex-col",
  };

  const isRow = position !== "left";

  return (
    <div
      className={cn(
        "pointer-events-none z-[100] flex items-center justify-center px-3",
        positionClasses[position],
        className,
      )}
    >
      <TooltipProvider delayDuration={100}>
        <div
          className={cn(
            "pointer-events-auto flex rounded-full border border-white/20 p-2 ring-1 ring-white/10 backdrop-blur-md",
            position === "left"
              ? "flex-col gap-2 px-2 py-4"
              : "flex-row items-center gap-1.5 sm:gap-2.5",
          )}
          style={{
            backgroundColor: "#141414",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={cn(
                  dockBtnClass,
                  "h-10 min-h-10 w-auto min-w-10 shrink-0 rounded-full px-2.5 sm:h-11 ",
                  isActiveHref("/") && dockActiveClass,
                )}
              >
                <Link
                  href="/"
                  className="flex h-full items-center justify-center"
                  aria-label="Multi Active Card"
                >
                  <Image
                    src="/logo.png"
                    alt=""
                    width={160}
                    height={40}
                    className="h-5 w-auto max-w-full object-contain object-center sm:h-[1.35rem]"
                  />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side={position === "left" ? "right" : "top"}
              className="border-white/15 text-xs text-white shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: "#141414" }}
            >
              Multi Active Card
            </TooltipContent>
          </Tooltip>

          <div
            role="separator"
            aria-hidden
            aria-orientation={isRow ? "vertical" : "horizontal"}
            className={cn(
              "shrink-0 bg-white/15",
              isRow
                ? "mx-0.5 h-7 w-px sm:mx-1 sm:h-8"
                : "my-1 h-px w-8 self-center sm:my-1.5 sm:w-9",
            )}
          />

          {dockItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={cn(
                    dockBtnClass,
                    "h-10 w-10 sm:h-11 sm:w-11",
                    isActiveHref(item.href) && dockActiveClass,
                  )}
                >
                  <Link href={item.href} aria-label={item.label}>
                    <item.icon
                      className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5"
                      strokeWidth={1.75}
                    />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side={position === "left" ? "right" : "top"}
                className="border-white/15 text-xs text-white shadow-lg backdrop-blur-sm"
                style={{ backgroundColor: "#141414" }}
              >
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
