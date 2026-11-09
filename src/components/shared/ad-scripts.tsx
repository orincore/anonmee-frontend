"use client";

import { usePathname } from "next/navigation";
import { useAdScript } from "@/hooks/use-ad-script";
import { ADS, pageAllowsAds } from "@/lib/ads";

/** Page-wide Adsterra units: the popunder and the social bar. Renders nothing; only loads the two scripts. */
export function AdScripts() {
  const enabled = pageAllowsAds(usePathname());
  useAdScript({ src: ADS.popunder, enabled });
  useAdScript({ src: ADS.socialBar, enabled });
  return null;
}
