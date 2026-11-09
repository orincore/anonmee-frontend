import { ADS } from "@/lib/ads";

export interface AdBlockProbes {
  /** True when a bait element carrying ad-like class names was hidden (cosmetic filters). */
  baitHidden: () => Promise<boolean>;
  /** False when a request to the ad network failed outright (network filters, DNS blockers). */
  adNetworkReachable: () => Promise<boolean>;
  online: () => boolean;
}

/**
 * Decides from the two probes. Offline is never treated as a blocker, so a dropped connection
 * does not lock anyone out of the app.
 */
export async function decideAdBlock(probes: AdBlockProbes): Promise<boolean> {
  if (!probes.online()) return false;
  const [hidden, reachable] = await Promise.all([probes.baitHidden(), probes.adNetworkReachable()]);
  return hidden || !reachable;
}

const BAIT_CLASSES = "adsbox ad-banner ad-placement pub_300x250 text-ad textAd text_ad text_ads text-ads";

function browserBaitHidden(): Promise<boolean> {
  return new Promise((resolve) => {
    const bait = document.createElement("div");
    bait.className = BAIT_CLASSES;
    bait.setAttribute("aria-hidden", "true");
    bait.style.cssText = "position:absolute;left:-9999px;top:0;width:1px;height:1px;pointer-events:none";
    document.body.appendChild(bait);
    // Give extensions a moment to apply their cosmetic filters.
    window.setTimeout(() => {
      const style = window.getComputedStyle(bait);
      const hidden = bait.offsetHeight === 0 || style.display === "none" || style.visibility === "hidden" || !bait.isConnected;
      bait.remove();
      resolve(hidden);
    }, 150);
  });
}

async function browserAdNetworkReachable(): Promise<boolean> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 8000);
  try {
    // no-cors: we only care whether the request leaves the browser, not what comes back.
    await fetch(ADS.popunder, { mode: "no-cors", cache: "force-cache", signal: controller.signal });
    return true;
  } catch (error) {
    // A timeout means a slow network, not a blocker.
    return error instanceof DOMException && error.name === "AbortError";
  } finally {
    window.clearTimeout(timer);
  }
}

export function detectAdBlockInBrowser(): Promise<boolean> {
  return decideAdBlock({ baitHidden: browserBaitHidden, adNetworkReachable: browserAdNetworkReachable, online: () => navigator.onLine });
}
