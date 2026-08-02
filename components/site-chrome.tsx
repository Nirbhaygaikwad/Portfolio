"use client";

import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/* ------------------------------------------------------------------ */
/* ScrollProgress — thin aurora bar pinned to the top of the viewport   */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-100 h-[2px] origin-left bg-gradient-to-r from-lime via-cyan to-lime"
    />
  );
}

/* ------------------------------------------------------------------ */
/* CursorGlow — a soft light that follows the pointer (desktop only)    */
/* ------------------------------------------------------------------ */

export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.5 });
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-0 hidden size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.55] blur-[90px] lg:block"
    >
      <div className="size-full rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_68%)]" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* AuroraBackdrop — slow-drifting colour fields behind the whole page   */
/* ------------------------------------------------------------------ */

export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-70" />
      <div
        className="absolute -top-40 -left-32 size-[38rem] rounded-full opacity-[0.16] blur-[120px] animate-drift"
        style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 size-[34rem] rounded-full opacity-[0.14] blur-[120px] animate-drift [animation-delay:-7s]"
        style={{ background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-48 left-1/3 size-[30rem] rounded-full opacity-[0.1] blur-[130px] animate-drift [animation-delay:-13s]"
        style={{ background: "radial-gradient(circle, var(--amber) 0%, transparent 70%)" }}
      />
    </div>
  );
}
