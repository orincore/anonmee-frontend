"use client";

import { useEffect, type RefObject } from "react";

type AdScriptOptions = {
  src: string;
  /** Where to put the script tag. Defaults to document.body (page-wide units like popunder and social bar). */
  into?: RefObject<HTMLElement | null>;
  /** Globals the network reads when the script runs, e.g. Adsterra's `atOptions`. */
  globals?: Record<string, unknown>;
  enabled?: boolean;
};

/**
 * Loads one third-party ad script after the page has hydrated and removes it again on unmount.
 * Injected with createElement (not a raw <script> in JSX) so React never sees the tag the network adds,
 * and so unit scripts that look at their own parent element (banners) find the container they belong in.
 */
export function useAdScript({ src, into, globals, enabled = true }: AdScriptOptions) {
  useEffect(() => {
    if (!enabled) return;
    const parent = into ? into.current : document.body;
    if (!parent) return;
    if (globals) Object.assign(window, globals);
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.cfasync = "false";
    parent.appendChild(script);
    return () => {
      script.remove();
    };
    // globals is a constant per call site; re-running on identity change would double-load the unit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, enabled]);
}
