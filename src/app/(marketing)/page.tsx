import type { Metadata } from "next";
import { FaqList } from "@/features/landing/components/faq-list";
import { FinalCta } from "@/features/landing/components/final-cta";
import { LiveTicker } from "@/features/landing/components/live-ticker";
import { Hero } from "@/features/landing/components/hero";
import { LandingJsonLd } from "@/features/landing/components/landing-json-ld";
import { Privacy } from "@/features/landing/components/privacy";
import { Process } from "@/features/landing/components/process";
import { TopicStickers } from "@/features/landing/components/topic-stickers";
import { PulseProvider } from "@/features/landing/pulse-provider";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Anonmee — Anonymous Dating, Friendship & Stranger Chat App (18+)",
  description:
    "Free anonymous app for dating, genuine friendship, and talking to strangers online. Match with verified adults 18+ based on shared intents with zero photo bias. 100% private.",
  keywords: [...SITE.keywords],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: "Anonmee — Anonymous Dating, Friendship & Stranger Chat App (18+)",
    description: "Match with adults 18+ for dating, friendship, or casual stranger chat. Zero photos, no real names exposed, 100% free.",
    url: SITE.url,
  },
};

export default function LandingPage() {
  return (
    <>
      <PulseProvider>
        <Hero />
        <LiveTicker />
      </PulseProvider>
      <Process />
      <TopicStickers />
      <Privacy />
      <FaqList />
      <FinalCta />
      <LandingJsonLd />
    </>
  );
}
