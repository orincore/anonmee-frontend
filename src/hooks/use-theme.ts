"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
const EVENT = "anonme-theme";

const read = (): Theme => {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  window.addEventListener(EVENT, onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    media.removeEventListener("change", onChange);
  };
}

/**
 * The page theme. It lives on the <html> element (set before first paint by the inline script in the
 * root layout), so there is no provider and no flash. Follows the system until the person picks one.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);
  const toggle = useCallback(() => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice lasts for this visit only */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { theme, toggle };
}
