"use client";

import { useEffect } from "react";

/**
 * Publishes the visible height as --vvh. On phones the on-screen keyboard shrinks the visual viewport but not the
 * layout viewport, so a chat sized with this variable keeps its composer above the keyboard.
 */
export function useViewportHeight() {
  useEffect(() => {
    const vv = window.visualViewport;
    const set = () => document.documentElement.style.setProperty("--vvh", `${vv?.height ?? window.innerHeight}px`);
    set();
    vv?.addEventListener("resize", set);
    return () => {
      vv?.removeEventListener("resize", set);
      document.documentElement.style.removeProperty("--vvh");
    };
  }, []);
}
