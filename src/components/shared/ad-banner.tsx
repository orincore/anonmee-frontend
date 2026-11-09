"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useAdScript } from "@/hooks/use-ad-script";
import { ADS, pageAllowsAds } from "@/lib/ads";

const { key, src, width, height } = ADS.banner728x90;

/**
 * Adsterra 728x90 banner. The unit is a fixed-width iframe, so it only shows from the `md` breakpoint up;
 * on phones it is hidden (and not loaded) so it never causes sideways scrolling.
 */
export function AdBanner() {
  const holder = useRef<HTMLDivElement>(null);
  const enabled = pageAllowsAds(usePathname());
  useAdScript({ src, into: holder, enabled, globals: { atOptions: { key, format: "iframe", height, width, params: {} } } });
  if (!enabled) return null;
  return (
    <div className="hidden justify-center overflow-hidden md:flex" aria-label="Advertisement">
      <div ref={holder} className="min-h-[90px] w-[728px] max-w-full" />
    </div>
  );
}
