"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { useRef } from "react";
import { Github, Linkedin } from "@/components/brand-icons";
import { site, stats } from "@/lib/site";
import { Counter, Magnetic, TypeCycle, ease } from "@/components/motion-primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax as the hero scrolls away
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-16 sm:px-8"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 py-1.5 pr-4 pl-2 backdrop-blur-sm"
        >
          <span className="relative grid size-4 place-items-center">
            <span className="absolute size-2 rounded-full bg-lime animate-pulse-ring" />
            <span className="size-2 rounded-full bg-lime" />
          </span>
          <span className="mono-label whitespace-nowrap text-muted-foreground">
            {site.availability}
            <span className="hidden sm:inline"> · {site.location}</span>
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mono-label mb-4 text-lime"
          >
            <span className="text-muted-foreground">~/</span> hello world
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease }}
            className="font-display text-[clamp(2.6rem,8vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.035em] text-balance"
          >
            <span className="text-aurora">{site.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-5 font-display text-[clamp(1.15rem,3.4vw,1.85rem)] leading-tight font-medium tracking-tight"
          >
            <TypeCycle words={site.roles} className="text-foreground" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground text-pretty sm:text-base"
          >
            {site.tagline}
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-primary-foreground transition-shadow duration-200 hover:shadow-[0_10px_36px_-10px_var(--glow)]"
            >
              View my work
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={site.resume}
              download
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-hairline bg-surface/60 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors duration-200 hover:border-lime/50 hover:text-lime"
            >
              <Download
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                strokeWidth={1.75}
              />
              Résumé
            </a>
          </Magnetic>

          <div className="ml-1 flex items-center gap-1.5">
            {[
              { href: site.github, icon: Github, label: "GitHub" },
              { href: site.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-hairline bg-surface/50 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:text-lime"
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56, ease }}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface/70 px-4 py-4 backdrop-blur-sm">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-bold tracking-tight text-lime sm:text-[1.75rem]">
                  <Counter
                    to={s.value}
                    suffix={s.suffix}
                    raw={"raw" in s ? Boolean(s.raw) : false}
                  />
                </span>
                <span className="mt-1 block text-[11px] leading-tight text-muted-foreground">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-lime md:flex"
      >
        <span className="mono-label">scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" strokeWidth={1.75} />
        </motion.span>
      </motion.a>
    </section>
  );
}
