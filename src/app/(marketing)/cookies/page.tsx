import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { COOKIE_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy — Essential Cookies Only, Zero Ad Tracking",
  description:
    "Anonmee cookie policy: essential security session cookies only. We never use advertising trackers or sell your browsing habits to third parties.",
  keywords: ["cookie policy", "privacy cookies", "no ad tracking", "secure session cookies"],
  alternates: { canonical: `${SITE.url}/cookies` },
  openGraph: {
    title: "Anonmee Cookie Policy — Essential Only",
    description: "Zero third-party advertising trackers. Read how Anonmee uses only essential session cookies.",
    url: `${SITE.url}/cookies`,
  },
};

export default function Page() {
  return <ProsePage title="Cookies, briefly." intro="Only what the service needs. No advertising, no trackers." updated="October 2026" sections={COOKIE_SECTIONS} />;
}
