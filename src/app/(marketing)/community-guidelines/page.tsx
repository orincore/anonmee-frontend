import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { GUIDELINES_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community Guidelines — Respect, Safety & Adult Etiquette",
  description:
    "How to treat people on Anonmee: consent first, strictly no minors, no harassment, and zero sharing of personal details.",
  keywords: ["community guidelines", "anonymous chat etiquette", "safety guidelines", "respectful adult chat"],
  alternates: { canonical: `${SITE.url}/community-guidelines` },
  openGraph: {
    title: "Anonmee Community Guidelines",
    description: "Our standards for safe, enjoyable dating, friendship, and stranger chat.",
    url: `${SITE.url}/community-guidelines`,
  },
};

export default function Page() {
  return <ProsePage title="Be a good stranger." intro="Simple rules that keep it fun and safe for everyone." updated="October 2026" sections={GUIDELINES_SECTIONS} />;
}
