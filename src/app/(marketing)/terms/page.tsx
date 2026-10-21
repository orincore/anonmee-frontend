import type { Metadata } from "next";
import { TERMS_SECTIONS } from "@/features/content/legal-content";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The rules for using Anonmee: adults only, be respectful, text only.",
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return <ProsePage title="The rules." intro="Fair rules for adults. Please read them before you use Anonmee." updated="October 2026" sections={TERMS_SECTIONS} />;
}
