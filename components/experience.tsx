"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion-primitives";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  // The spine draws itself as you scroll through the timeline
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <SectionHeading
        index="03"
        eyebrow="experience"
        title="Where I've been putting the hours in."
      />

      <div ref={trackRef} className="relative pl-8 sm:pl-12">
        {/* Timeline spine */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-hairline sm:left-[11px]" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-lime via-cyan to-transparent sm:left-[11px]"
        />

        <div className="space-y-5">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="relative">
                {/* Node */}
                <span className="absolute top-7 -left-8 grid size-4 place-items-center sm:-left-12">
                  {job.current && (
                    <span className="absolute size-2.5 rounded-full bg-lime animate-pulse-ring" />
                  )}
                  <span
                    className={
                      job.current
                        ? "size-2.5 rounded-full bg-lime ring-4 ring-background"
                        : "size-2.5 rounded-full bg-surface-2 ring-4 ring-background"
                    }
                  />
                </span>

                <div className="card-surface rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {job.company}
                        {job.meta && (
                          <span className="text-muted-foreground/70"> · {job.meta}</span>
                        )}
                      </p>
                    </div>

                    <span
                      className={
                        job.current
                          ? "mono-label shrink-0 rounded-full border border-lime/25 bg-lime-soft px-3 py-1 text-lime"
                          : "mono-label shrink-0 rounded-full border border-hairline px-3 py-1 text-muted-foreground"
                      }
                    >
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[14.5px] leading-relaxed text-muted-foreground text-pretty"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.6em] size-1 shrink-0 rounded-full bg-lime/70"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
