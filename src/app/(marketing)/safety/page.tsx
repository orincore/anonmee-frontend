import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { SAFETY_SECTIONS } from "@/features/content/safety-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety and privacy",
  description: "How Anonmee keeps chat safe: adults only, only gender and age shown, one-tap report and block, text only.",
  alternates: { canonical: `${SITE.url}/safety` },
};

export default function SafetyPage() {
  return <ProsePage title="Safety comes first." intro="Anonymous does not have to mean unsafe. Here is exactly how Anonmee works to protect you." sections={SAFETY_SECTIONS} />;
}
