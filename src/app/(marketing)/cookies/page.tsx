import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { COOKIE_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy — Essential Cookies and Ad Cookies",
  description:
    "Anonmee cookie policy: essential session cookies, a first-party visit counter, and cookies from our ad partner Adsterra on pages that show ads.",
  keywords: ["cookie policy", "privacy cookies", "ad cookies", "secure session cookies"],
  alternates: { canonical: `${SITE.url}/cookies` },
  openGraph: {
    title: "Anonmee Cookie Policy",
    description: "What Anonmee sets, and what our ad partner sets on pages that show ads.",
    url: `${SITE.url}/cookies`,
  },
};

export default function Page() {
  return <ProsePage title="Cookies, briefly." intro="What we set, and what our ad partner sets." updated="October 2026" sections={COOKIE_SECTIONS} />;
}
