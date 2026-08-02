"use client";

import { motion } from "motion/react";
import { Reveal, ease } from "@/components/motion-primitives";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <span className="mono-label text-lime">
            {index} <span className="text-muted-foreground">/</span> {eyebrow}
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="h-px flex-1 origin-left bg-gradient-to-r from-lime/50 to-transparent"
          />
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="max-w-2xl font-display text-[clamp(1.9rem,5vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground text-pretty">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
