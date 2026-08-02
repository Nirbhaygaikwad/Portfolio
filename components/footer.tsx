"use client";

import { motion } from "motion/react";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="#top"
              className="group inline-flex cursor-pointer items-baseline gap-2 font-display text-2xl font-bold tracking-tight"
            >
              {site.name}
              <span className="text-lime">.</span>
            </a>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted-foreground text-pretty">
              Built with Next.js, Tailwind and Framer Motion — then argued with until the
              spacing felt right.
            </p>
          </div>

          <div className="flex items-center gap-2">
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
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-hairline text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:text-lime"
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </a>
            ))}

            <motion.a
              href="#top"
              aria-label="Back to top"
              whileHover={{ y: -3 }}
              className="ml-1 grid size-10 cursor-pointer place-items-center rounded-full bg-lime text-primary-foreground"
            >
              <ArrowUp className="size-[18px]" strokeWidth={2} />
            </motion.a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11.5px] text-muted-foreground">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11.5px] text-muted-foreground">
            <span className="text-lime">●</span> {site.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
