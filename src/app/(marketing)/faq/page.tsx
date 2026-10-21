import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { FAQ_ITEMS } from "@/lib/faq-items";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about Anonmee: who can use it, what others see, how long messages are kept, and how reporting works.",
  alternates: { canonical: `${SITE.url}/faq` },
};

export default function FaqPage() {
  // The structured data repeats the visible answers word for word, so search engines and AI assistants quote us correctly.
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <ProsePage title="Questions people ask." intro="Straight answers, no fine print." sections={FAQ_ITEMS.map((f) => ({ heading: f.q, paragraphs: [f.a] }))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
