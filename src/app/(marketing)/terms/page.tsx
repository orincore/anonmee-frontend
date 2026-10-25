import type { Metadata } from "next";
import { TERMS_SECTIONS } from "@/features/content/legal-content";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Fair Rules for Adults (18+)",
  description:
    "Terms of service for Anonmee: strict 18+ requirement, text-only communications, respect guidelines, and zero tolerance for harassment.",
  keywords: ["anonmee terms", "terms of service", "adult chat rules", "anonymous chat terms"],
  alternates: { canonical: `${SITE.url}/terms` },
  openGraph: {
    title: "Anonmee Terms of Service",
    description: "Rules for safe, respectful anonymous dating and stranger chat on Anonmee.",
    url: `${SITE.url}/terms`,
  },
};

export default function TermsPage() {
  return <ProsePage title="The rules." intro="Fair rules for adults. Please read them before you use Anonmee." updated="October 2026" sections={TERMS_SECTIONS} />;
}
