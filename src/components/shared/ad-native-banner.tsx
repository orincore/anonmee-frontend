"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useAdScript } from "@/hooks/use-ad-script";
import { ADS, pageAllowsAds } from "@/lib/ads";

/** Adsterra native banner. The container id is fixed by the network, so use at most one per page. */
export function AdNativeBanner() {
  const holder = useRef<HTMLDivElement>(null);
  const enabled = pageAllowsAds(usePathname());
  useAdScript({ src: ADS.native.src, into: holder, enabled });
  if (!enabled) return null;
  return (
    <div className="w-full" aria-label="Advertisement">
      <div ref={holder}>
        <div id={ADS.native.containerId} />
      </div>
    </div>
  );
}
