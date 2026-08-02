"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { learning, marquee, skillGroups } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, StaggerItem, ease } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="skills"
          title="Two tracks, running in parallel."
          lead="Above, what I can build with today. Below, what I'm deliberately getting good at next."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2" gap={0.09}>
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="card-surface h-full rounded-2xl p-6 sm:p-7">
                <div className="mb-5 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <span className="mono-label shrink-0 text-muted-foreground">
                    {group.hint}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.04, ease }}
                    >
                      <span
                        className={cn(
                          "inline-block cursor-default rounded-lg border px-3 py-1.5 font-mono text-[12.5px] transition-colors duration-200",
                          group.accent === "lime"
                            ? "border-lime/20 bg-lime-soft text-lime hover:border-lime/45"
                            : "border-cyan/20 bg-cyan-soft text-cyan hover:border-cyan/45",
                        )}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Currently learning */}
        <Reveal delay={0.08} className="mt-5">
          <div className="card-surface rounded-2xl p-6 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <Sparkles className="size-4 text-amber" strokeWidth={1.75} />
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {learning.title}
              </h3>
            </div>
            <p className="mb-7 max-w-lg text-[13.5px] leading-relaxed text-muted-foreground text-pretty">
              {learning.blurb}
            </p>

            <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {learning.items.map((item, i) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: item.progress / 100 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1, delay: 0.12 * i, ease }}
                      className="h-full origin-left rounded-full bg-gradient-to-r from-lime to-cyan"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Infinite marquee — full bleed. Two identical tracks, each shifting
          its own width, so the loop has no seam. */}
      <div className="mask-fade-x mt-14 flex select-none overflow-hidden border-y border-hairline py-5">
        {[0, 1].map((track) => (
          <div
            key={track}
            aria-hidden={track === 1}
            className="flex shrink-0 animate-marquee gap-3 pr-3"
          >
            {marquee.map((item) => (
              <span
                key={item}
                className="shrink-0 rounded-lg border border-hairline bg-surface/50 px-4 py-2 font-mono text-[13px] whitespace-nowrap text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
