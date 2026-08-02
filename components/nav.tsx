"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Nav() {
  // Empty means "still in the hero" — no pill is shown up there
  const [active, setActive] = useState<string>("");
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setCondensed(v > 40);
    if (v < 200) setActive("");
  });

  /* Scroll-spy: whichever section owns the upper third of the viewport wins */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 200) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.3, 0.6] },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Lock body scroll while the mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-5xl items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
            condensed
              ? "glass border border-hairline shadow-[0_8px_32px_-16px_rgba(0,0,0,0.5)]"
              : "border border-transparent",
          )}
        >
          {/* Monogram */}
          <a
            href="#top"
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-2 py-1"
            aria-label={`${site.name} — back to top`}
          >
            <span className="relative grid size-7 place-items-center rounded-md bg-lime/12 font-mono text-[11px] font-bold text-lime ring-1 ring-lime/30">
              {site.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {site.shortName}
              <span className="text-lime">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="mx-auto hidden items-center gap-1 md:flex">
            {navItems.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={cn(
                      "relative block cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-lime/12 ring-1 ring-lime/25"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden cursor-pointer rounded-full bg-lime px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:block"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-hairline bg-surface text-muted-foreground transition-colors hover:text-foreground md:hidden"
            >
              <Menu className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[78%] max-w-xs flex-col border-l border-hairline bg-surface p-6"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="mb-10 ml-auto grid size-9 cursor-pointer place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>

              <ul className="flex flex-col gap-1">
                {navItems.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className="flex cursor-pointer items-baseline gap-3 rounded-lg px-2 py-3 font-display text-2xl font-medium tracking-tight transition-colors hover:text-lime"
                    >
                      <span className="mono-label text-lime/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto cursor-pointer rounded-full bg-lime py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
