import type { Metadata } from "next";
import { PRIVACY_SECTIONS } from "@/features/content/legal-content";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — How We Protect Your Anonymity & Data",
  description:
    "Anonmee privacy principles: zero personal data exposed, ephemeral message deletion, and complete user control. Read our full privacy policy.",
  keywords: ["anonmee privacy", "anonymous chat privacy policy", "ephemeral chat privacy", "user data protection"],
  alternates: { canonical: `${SITE.url}/privacy` },
  openGraph: {
    title: "Anonmee Privacy Policy — Transparent & Ephemeral",
    description: "Learn what Anonmee collects, how 1:1 messages are deleted, and why your identity is safe.",
    url: `${SITE.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return <ProsePage title="Privacy, in plain words." intro="What we collect, who can see it, how long we keep it, and what you can do about it." updated="October 2026" sections={PRIVACY_SECTIONS} />;
}
