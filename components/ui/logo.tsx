import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Multi Active Card">
      <Image
        src="/logo.webp"
        alt="Multi Active Card logo"
        width={140}
        height={40}
        className="h-9 w-auto"
        priority
      />
    </Link>
  );
}
