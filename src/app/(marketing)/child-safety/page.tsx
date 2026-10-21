import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { CHILD_SAFETY_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Child safety and age policy",
  description: "Anonmee is for adults 18 and over. How we keep minors out and what we do when someone reports one.",
  alternates: { canonical: `${SITE.url}/child-safety` },
};

export default function Page() {
  return <ProsePage title="Adults only. No exceptions." intro="How we keep people under 18 off Anonmee, and what happens when something is reported." updated="October 2026" sections={CHILD_SAFETY_SECTIONS} />;
}
