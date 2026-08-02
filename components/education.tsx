"use client";

import { GraduationCap } from "lucide-react";
import { education } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion-primitives";

export function Education() {
  return (
    <section
      id="education"
      className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <SectionHeading index="05" eyebrow="education" title="How I got here." />

      <StaggerGroup className="grid gap-4 md:grid-cols-3" gap={0.1}>
        {education.map((item) => (
          <StaggerItem key={item.degree}>
            <div className="card-surface group flex h-full flex-col rounded-2xl p-6">
              <div className="mb-5 flex items-start justify-between gap-3">
                <GraduationCap
                  className="size-5 text-lime transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
                <span className="mono-label shrink-0 text-muted-foreground">
                  {item.period}
                </span>
              </div>

              <h3 className="font-display text-base leading-snug font-semibold tracking-tight text-balance">
                {item.degree}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground text-pretty">
                {item.school}
              </p>
              <p className="mt-auto pt-4 font-mono text-[11.5px] text-muted-foreground/80">
                {item.place}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
