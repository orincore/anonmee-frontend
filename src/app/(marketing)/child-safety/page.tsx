import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { CHILD_SAFETY_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Child Safety & Age Verification Policy (18+ Strict)",
  description:
    "Anonmee is strictly for adults 18 and over. How we prevent minors from joining, our reporting protocols, and our zero-tolerance policies.",
  keywords: ["child safety", "age policy 18+", "adults only chat policy", "minor protection"],
  alternates: { canonical: `${SITE.url}/child-safety` },
  openGraph: {
    title: "Anonmee Child Safety & Strict 18+ Age Policy",
    description: "Our comprehensive measures to keep minors off Anonmee and maintain a safe adult environment.",
    url: `${SITE.url}/child-safety`,
  },
};

export default function Page() {
  return <ProsePage title="Adults only. No exceptions." intro="How we keep people under 18 off Anonmee, and what happens when something is reported." updated="October 2026" sections={CHILD_SAFETY_SECTIONS} />;
}
