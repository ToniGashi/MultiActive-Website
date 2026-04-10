"use client";

import {
  HeartPulse,
  ChartLine,
  Scale,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const features = [
  {
    title: "Mirëqenie më e mirë në punë",
    icon: HeartPulse,
    description:
      "Ndihmon kompanitë të krijojnë forca punëtore më të shëndetshme, më të angazhuara dhe më të lumtura.",
  },
  {
    title: "Produktivitet i përmirësuar",
    icon: ChartLine,
    description:
      "Punonjësit fizikisht dhe mendërisht të gatshëm kontribuojnë më mirë në rezultatet e përditshme.",
  },
  {
    title: "Kulturë pune të balancuar",
    icon: Scale,
    description:
      "Nxit një mentalitet ku shëndeti dhe balanca punë-jetë janë pjesë e suksesit të biznesit.",
  },
  {
    title: "Rritje ekonomike afatgjatë",
    icon: TrendingUp,
    description:
      "Forcat e punës më të shëndetshme kanë ndikim pozitiv në performancë dhe në zhvillimin e kompanisë.",
  },
  {
    title: "Praktika të qëndrueshme HR",
    icon: Users,
    description:
      "Përfitimet domethënëse ndihmojnë në tërheqjen dhe mbajtjen e talenteve më të mira.",
  },
  {
    title: "Ndikim real në komunitet",
    icon: Globe,
    description:
      "Promovimi i aktivitetit fizik dhe mirëqenies shndërrohet në vlerë përtej vendit të punës.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function GridFeatureCardsDemo() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-gradient-to-b from-background via-zinc-950/40 to-background py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <AnimatedHeader className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Për kompanitë
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-[2.5rem] lg:leading-tight">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Ndërtuar për rritjen e produktivitetit
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Kompanitë na zgjedhin për platformën inovative dhe promovimin e
            mirëqenies së punonjësve.
          </p>
        </AnimatedHeader>

        {reduceMotion ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function AnimatedHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
