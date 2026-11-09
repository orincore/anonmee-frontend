"use client";

import { useEffect, useState } from "react";
import { detectAdBlockInBrowser } from "@/lib/ad-block-detect";

export type AdBlockStatus = "checking" | "clear" | "blocked";

/** Runs the ad-blocker check once per mount. Stays "checking" (nothing shown) until the answer is in. */
export function useAdBlockCheck(enabled: boolean): AdBlockStatus {
  const [status, setStatus] = useState<AdBlockStatus>("checking");
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    detectAdBlockInBrowser()
      .then((blocked) => !cancelled && setStatus(blocked ? "blocked" : "clear"))
      // If the check itself breaks, fail open: never lock people out because of our own bug.
      .catch(() => !cancelled && setStatus("clear"));
    return () => {
      cancelled = true;
    };
  }, [enabled]);
  return enabled ? status : "clear";
}
