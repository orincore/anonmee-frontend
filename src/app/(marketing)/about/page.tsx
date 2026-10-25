import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Anonmee — Why We Built an Anonymous Dating & Friendship App",
  description:
    "Learn why Anonmee was created: to give adults 18+ a genuine space for dating, authentic friendship, and talking to strangers without photo swiping, social anxiety, or identity leakage.",
  keywords: [
    "about anonmee",
    "anonymous dating story",
    "why anonymous dating",
    "friendship app without photos",
    "safe stranger chat mission",
  ],
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: "About Anonmee — Meaningful Connections Without Profiles",
    description: "Anonmee exists so adults 18+ can date, make friends, and chat with strangers without handing over their identity.",
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Anonmee",
    url: `${SITE.url}/about`,
    description: "The mission, safety principles, and philosophy behind the Anonmee anonymous dating, friendship, and stranger chat application.",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
    },
  };

  return (
    <>
      <ProsePage
        title="Say it. Stay you."
        intro="Anonmee exists so adults can meet someone new for dating, friendship, or late-night thoughts without handing over their identity or being judged by a photo gallery."
        sections={[
          {
            heading: "What Anonmee is",
            paragraphs: [
              "Anonmee is a free, privacy-first platform designed for authentic human connection. Whether you are looking for casual dating, romantic relationships, genuine friendships, deep late-night conversations, or simply someone to talk to, Anonmee pairs you with another adult (18+) who shares your exact intent.",
              "Nobody ever sees your email, username, real name, or date of birth. Other users only see a random alias, your gender, and your age. There are no photo uploads, no follower counts, and no social media stalking.",
            ],
          },
          {
            heading: "Why we built an anonymous connection app",
            paragraphs: [
              "Modern social networks and dating apps have become performative storefronts. Swiping through filtered selfies turns dating into an algorithmic catalog, while social media makes reaching out to make new friends awkward and vulnerable.",
              "Sometimes you just want a raw, honest conversation where your appearance, job title, and social status do not matter. We believe anonymity brings out sincerity — when people feel safe from real-world exposure, they open up, laugh freely, and connect on a much deeper level.",
            ],
          },
          {
            heading: "Safety is built into every layer",
            paragraphs: [
              "Anonymity does not have to mean chaos. Anonmee is strictly for verified adults 18 and over, text-only to eliminate unsolicited image sharing, and equipped with instant one-tap Skip, Block, and Report controls.",
              "One-to-one chats are completely ephemeral and automatically erased from server memory as soon as either person leaves. What happens in your conversation stays in your conversation.",
            ],
          },
        ]}
      />
      <script
        id="about-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
