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
  title: { absolute: "Anonmee: anonymous chat for adults" },
  description: "Chat with strangers who want the same thing as you. Only gender and age are shown. Free, adults 18 and over.",
  alternates: { canonical: SITE.url },
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
