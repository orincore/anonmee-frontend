import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/layout";
import { AdBanner } from "@/components/shared/ad-banner";
import { GlobalCard } from "@/features/home/components/global-card";
import { GroupFeed } from "@/features/home/components/group-feed";
import { StartCard } from "@/features/home/components/start-card";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <PageShell title="Hey, stranger." subtitle="Pick your next conversation." width="wide">
      <div className="space-y-10">
        <StartCard />
        <GlobalCard />
        <Suspense fallback={null}>
          <AdBanner />
        </Suspense>
        <section aria-labelledby="feed-title" className="space-y-5">
          <h2 id="feed-title" className="display text-3xl">
            Groups for you
          </h2>
          <GroupFeed />
        </section>
      </div>
    </PageShell>
  );
}
