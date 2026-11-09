"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useAdBlockCheck } from "@/hooks/use-ad-block-check";
import { pageNeedsAdsOn } from "@/lib/ads";
import { AdBlockWall } from "./ad-block-wall";

/**
 * Covers the app with the ad-blocker notice when a blocker is detected.
 * Everything behind it is made inert (no focus, no clicks, hidden from screen readers) and page scroll is locked.
 */
export function AdBlockGate() {
  const status = useAdBlockCheck(pageNeedsAdsOn(usePathname()));
  const blocked = status === "blocked";

  useEffect(() => {
    if (!blocked) return;
    const hidden = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && !el.hasAttribute("data-ad-wall") && !el.inert);
    hidden.forEach((el) => (el.inert = true));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      hidden.forEach((el) => (el.inert = false));
      document.body.style.overflow = overflow;
    };
  }, [blocked]);

  if (!blocked) return null;
  return createPortal(<AdBlockWall onReload={() => window.location.reload()} />, document.body);
}
