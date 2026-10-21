import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { GUIDELINES_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community guidelines",
  description: "How to treat people on Anonmee: consent first, no minors, no pressure, no sharing personal details.",
  alternates: { canonical: `${SITE.url}/community-guidelines` },
};

export default function Page() {
  return <ProsePage title="Be a good stranger." intro="Simple rules that keep it fun and safe for everyone." updated="October 2026" sections={GUIDELINES_SECTIONS} />;
}
