import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { COOKIE_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "What Anonmee stores on your device, why, and how to turn it off.",
  alternates: { canonical: `${SITE.url}/cookies` },
};

export default function Page() {
  return <ProsePage title="Cookies, briefly." intro="Only what the service needs. No advertising, no trackers." updated="October 2026" sections={COOKIE_SECTIONS} />;
}
