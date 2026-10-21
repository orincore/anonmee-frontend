"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";
import { saveVisitId } from "../visit-id";

/**
 * Counts this visit (where it came from, never who) so we can see which links and searches work.
 * First party only, no cookies set from here, and it does nothing if the request fails.
 */
export function VisitTracker() {
  useEffect(() => {
    // Count each page once per tab session, so dev double-runs and quick reloads never inflate the numbers.
    const seen = `tracked:${window.location.href}`;
    try {
      if (sessionStorage.getItem(seen)) return;
      sessionStorage.setItem(seen, "1");
    } catch {
      /* storage can be blocked; counting is best effort */
    }
    fetch(`${SITE.api}/track/visit`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: window.location.href, referrer: document.referrer || undefined }),
    })
      .then((r) => r.json())
      .then((d: { visitId?: string }) => d.visitId && saveVisitId(d.visitId))
      .catch(() => {});
  }, []);
  return null;
}
