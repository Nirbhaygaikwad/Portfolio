"use client";

import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "portfolio-theme";

/**
 * The current theme lives in a single place — the `dark` class on <html>,
 * set before first paint by `themeScript` below. Both icons render on the
 * server and CSS decides which one is visible, so there's no hydration
 * mismatch and no state to keep in sync.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the toggle still works for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="relative grid size-9 cursor-pointer place-items-center overflow-hidden rounded-full border border-hairline bg-surface text-muted-foreground transition-colors duration-200 hover:border-lime/50 hover:text-lime"
    >
      <Sun
        className="absolute size-4 rotate-0 scale-100 opacity-100 transition-all duration-300 dark:-rotate-90 dark:scale-50 dark:opacity-0"
        strokeWidth={1.75}
        aria-hidden
      />
      <Moon
        className="absolute size-4 rotate-90 scale-50 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}

/**
 * Runs before paint so the correct theme is applied without a flash.
 * Injected from the root layout.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;
