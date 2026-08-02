"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without setState-in-effect.
 * Returns `false` during SSR so the server render is always the quiet one.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
