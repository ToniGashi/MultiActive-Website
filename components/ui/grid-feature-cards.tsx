import { cn } from "@/lib/utils";
import React from "react";

export type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/90 p-6 shadow-[0_0_36px_-18px_rgba(59,130,246,0.12)] backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-16px_rgba(59,130,246,0.25)]",
        className,
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-primary/15 to-transparent opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col">
        <div className="inline-flex w-fit rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/15 group-hover:ring-primary/35">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground">
          {feature.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
