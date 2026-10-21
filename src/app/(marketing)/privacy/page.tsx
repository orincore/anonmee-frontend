import type { Metadata } from "next";
import { PRIVACY_SECTIONS } from "@/features/content/legal-content";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Anonmee collects, who can see it, and how long messages are kept.",
  alternates: { canonical: `${SITE.url}/privacy` },
};

export default function PrivacyPage() {
  return <ProsePage title="Privacy, in plain words." intro="What we collect, who can see it, how long we keep it, and what you can do about it." updated="October 2026" sections={PRIVACY_SECTIONS} />;
}
