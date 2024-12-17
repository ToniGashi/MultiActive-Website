import Image from "next/image";
import type { ImageProps } from "next/image";

interface IconGeneratorProps extends Omit<ImageProps, "height" | "width"> {
  src: string;
  width?: string;
  height?: number;
  alt: string;
  className?: string;
}

export default function IconGenerator({
  src,
  width,
  height,
  alt,
  className,
  ...rest
}: IconGeneratorProps) {
  return (
    <Image
      alt={alt}
      src={src}
      width={0}
      height={0}
      className={className}
      style={{ width: width, height: height ?? "auto" }}
      {...rest}
    />
  );
}
