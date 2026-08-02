"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";
import { Github } from "@/components/brand-icons";
import { projects, site, type Project } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, ease } from "@/components/motion-primitives";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <SectionHeading
        index="04"
        eyebrow="projects"
        title="Things I built, and what each one taught me."
        lead="Every project here started as a problem I actually wanted solved, which is the only reason any of them got finished."
      />

      <div className="space-y-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-hairline px-6 py-6 transition-colors duration-200 hover:border-lime/50"
        >
          <div>
            <p className="font-display text-base font-semibold tracking-tight">
              More on GitHub
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Everything else I&apos;m tinkering with lives at @{site.githubHandle}
            </p>
          </div>
          <ArrowUpRight
            className="size-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
            strokeWidth={1.75}
          />
        </a>
      </Reveal>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Spotlight follows the cursor across the card surface
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, var(--lime-soft), transparent 65%)`;

  return (
    <Reveal delay={index * 0.07}>
      <motion.article
        ref={ref}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set(e.clientX - rect.left);
          my.set(e.clientY - rect.top);
        }}
        onPointerLeave={() => {
          mx.set(-200);
          my.set(-200);
        }}
        className="card-surface group relative overflow-hidden rounded-2xl p-6 sm:p-8"
      >
        {/* Cursor spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="mono-label text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.featured && (
                <span className="mono-label rounded-full border border-lime/25 bg-lime-soft px-2.5 py-0.5 text-lime">
                  featured
                </span>
              )}
              <span className="mono-label text-muted-foreground">{project.year}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-[13px] text-cyan">{project.blurb}</p>

            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground text-pretty">
              {project.description}
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease }}
                  className="flex gap-2.5 text-[13.5px] leading-snug text-muted-foreground"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-lime" strokeWidth={2.5} />
                  {h}
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-row gap-2 md:flex-col">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex cursor-pointer items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                Live demo
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-[13px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:text-lime"
              >
                <Github className="size-3.5" strokeWidth={1.75} />
                Code
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
