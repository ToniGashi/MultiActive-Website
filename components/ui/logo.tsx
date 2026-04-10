import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "header";

const variantConfig: Record<
  LogoVariant,
  { width: number; height: number; imgClass: string }
> = {
  default: {
    width: 140,
    height: 40,
    imgClass: "h-9 w-auto",
  },
  header: {
    width: 140,
    height: 40,
    imgClass: "h-8 w-auto md:h-9",
  },
};

type LogoProps = {
  className?: string;
  variant?: LogoVariant;
  /** LCP: use true only once per page (e.g. header). */
  priority?: boolean;
};

export default function Logo({
  className,
  variant = "default",
  priority = false,
}: LogoProps) {
  const cfg = variantConfig[variant];

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Multi Active Card — kryefaqja"
    >
      <Image
        src="/logo.png"
        alt="Multi Active Card"
        width={cfg.width}
        height={cfg.height}
        className={cfg.imgClass}
        priority={priority}
      />
    </Link>
  );
}
