import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { SAFETY_SECTIONS } from "@/features/content/safety-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety & Privacy Standards — Safe Anonymous Dating & Chat",
  description:
    "How Anonmee keeps anonymous chat safe: strict 18+ adult age gating, text-only communication, ephemeral message wiping, and instant one-tap block and report mechanisms.",
  keywords: [
    "safe stranger chat",
    "anonymous dating safety",
    "safe chat app",
    "text only stranger chat",
    "ephemeral messaging privacy",
  ],
  alternates: { canonical: `${SITE.url}/safety` },
  openGraph: {
    title: "Safety and Privacy at Anonmee",
    description: "Learn how Anonmee protects adults in anonymous dating, friendship, and stranger chat rooms.",
    url: `${SITE.url}/safety`,
  },
};

export default function SafetyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Anonmee Safety and Privacy Architecture",
    url: `${SITE.url}/safety`,
    description: "Detailed breakdown of the age validation, moderation rules, and encryption policies protecting Anonmee users.",
  };

  return (
    <>
      <ProsePage
        title="Safety comes first."
        intro="Anonymous does not have to mean unsafe. Here is exactly how Anonmee works to protect you while keeping you completely private."
        sections={SAFETY_SECTIONS}
      />
      <script
        id="safety-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
