import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { FAQ_ITEMS } from "@/lib/faq-items";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Anonymous Dating, Friendship & Chat",
  description:
    "Direct answers about Anonmee: how anonymous dating and friendship matching works, privacy rules, zero photo policy, ephemeral chats, and safety moderation for adults 18+.",
  keywords: [
    "anonmee faq",
    "anonymous dating questions",
    "how to make friends anonymously",
    "is anonmee safe",
    "how stranger matching works",
  ],
  alternates: { canonical: `${SITE.url}/faq` },
  openGraph: {
    title: "Anonmee FAQ — Questions People Ask",
    description: "Clear answers on how Anonmee handles anonymous matching, user privacy, and adult community safety.",
    url: `${SITE.url}/faq`,
  },
};

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <ProsePage
        title="Questions people ask."
        intro="Straightforward answers about anonymous dating, making friends, stranger chat, and our privacy guarantees."
        sections={FAQ_ITEMS.map((f) => ({ heading: f.q, paragraphs: [f.a] }))}
      />
      <script
        id="faq-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
