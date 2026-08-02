"use client";

import { motion } from "motion/react";
import { Camera, MapPin, Plane, Volleyball } from "lucide-react";
import { hobbies, site } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, StaggerItem, Tilt } from "@/components/motion-primitives";

const hobbyIcons = [Plane, Camera, Volleyball];

export function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="about"
        title="A developer who kept asking what the data was for."
      />

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Bio */}
        <Reveal className="card-surface rounded-2xl p-7 sm:p-9">
          <div className="space-y-5">
            {site.bio.map((para, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.75] text-muted-foreground text-pretty sm:text-base"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-6">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-lime" strokeWidth={1.75} />
              {site.location}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="cursor-pointer font-mono text-sm text-lime transition-opacity hover:opacity-75"
            >
              {site.email}
            </a>
          </div>
        </Reveal>

        {/* Monogram card */}
        <Tilt className="hidden lg:block">
          <Reveal delay={0.1} className="h-full">
            <div className="card-surface relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  background:
                    "radial-gradient(circle at 70% 15%, var(--lime-soft) 0%, transparent 55%)",
                }}
              />
              <span className="relative mono-label text-muted-foreground">whoami</span>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative my-auto font-display text-[6.5rem] leading-none font-bold tracking-tighter text-aurora-tight"
              >
                {site.initials}
              </motion.p>

              <div className="relative space-y-2.5 font-mono text-[13px]">
                {[
                  ["role", "full-stack dev"],
                  ["stack", "MERN"],
                  ["studying", "AI / ML"],
                  ["status", "shipping"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-2">
                    <span className="text-muted-foreground">{k}:</span>
                    <span className="text-foreground">&quot;{v}&quot;</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Tilt>
      </div>

      {/* Beyond the screen */}
      <StaggerGroup className="mt-5 grid gap-5 sm:grid-cols-3" delay={0.1}>
        {hobbies.map((h, i) => {
          const Icon = hobbyIcons[i] ?? Plane;
          return (
            <StaggerItem key={h.name}>
              <div className="card-surface group h-full rounded-2xl p-6">
                <Icon
                  className="mb-4 size-5 text-cyan transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {h.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground text-pretty">
                  {h.note}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
