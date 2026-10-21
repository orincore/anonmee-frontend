import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MatchScreen } from "@/features/chat/components/match-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Chat" };

export default function ChatPage() {
  // useSearchParams needs a boundary so the rest of the page can be prerendered.
  return (
    <Suspense fallback={<div className="mx-auto max-w-xl space-y-5 px-4 pt-24"><Skeleton className="h-16 w-3/4" /><Skeleton className="h-14 w-48" /></div>}>
      <MatchScreen />
    </Suspense>
  );
}
