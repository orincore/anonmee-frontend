/*
 * Adsterra ad units. These are public embed values (they ship to every visitor's browser by design),
 * so they live in code rather than env. The master switch is NEXT_PUBLIC_ADS_ENABLED.
 */
export const ADS = {
  popunder: "https://pl32283751.profitableratecpmnetwork.com/e8/67/30/e867300b38dcac4978f96dc989ad61d8.js",
  socialBar: "https://pl32283752.profitableratecpmnetwork.com/a0/41/44/a04144f6604c6631ba4e20fe494d068b.js",
  native: {
    src: "https://bicea.org/21/b13cf6b1f0d98af0b1d84b6720dae1e9",
    containerId: "container-b13cf6b1f0d98af0b1d84b6720dae1e9",
  },
  banner728x90: {
    key: "686731aca65c98b1f453e352a98649d1",
    src: "https://bicea.org/22/686731aca65c98b1f453e352a98649d1",
    width: 728,
    height: 90,
  },
  smartlink: "https://www.profitableratecpmnetwork.com/wheyf7f0s?key=1bf9a14c3357e45b7cc34395bb7af756",
} as const;

// On in production, off in dev so local work never loads ad networks. Set NEXT_PUBLIC_ADS_ENABLED=false to stop all ads.
export const ADS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENABLED !== undefined
    ? process.env.NEXT_PUBLIC_ADS_ENABLED === "true"
    : process.env.NODE_ENV === "production";

/*
 * Routes where the page-wide ad scripts (popunder, social bar) must never run: staff screens, the sign-in and
 * sign-up forms, and live conversations, where a popunder fired by the Send button would wreck the chat.
 */
const AD_FREE_PREFIXES = ["/admin", "/login", "/signup", "/verify-email", "/forgot-password", "/chat", "/groups/"];

export function pageAllowsAds(pathname: string | null): boolean {
  if (!ADS_ENABLED || !pathname) return false;
  return !AD_FREE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
