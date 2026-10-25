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
  title: "Anonmee Dating App — Anonymous Dating, Friendship & Stranger Chat (18+)",
  description:
    "Anonmee is the premier free anonymous dating app for adults 18+. Match with singles based on mutual intent with zero photo bias or superficial swiping. 100% private.",
  keywords: [...SITE.keywords],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: "Anonmee Dating App — Anonymous Dating, Friendship & Stranger Chat (18+)",
    description: "Match with adults 18+ for anonymous dating, romance, friendship, or casual stranger chat. Zero photos, no real names exposed, 100% free.",
    url: SITE.url,
    images: [
      {
        url: `${SITE.url}/anonme-logo.png`,
        width: 1200,
        height: 1200,
        alt: "Anonmee Dating App Logo",
      },
    ],
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
