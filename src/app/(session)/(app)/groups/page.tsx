import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupsScreen } from "@/features/groups/components/groups-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Groups" };

export default function GroupsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl space-y-5 px-4 pt-10"><Skeleton className="h-12 w-1/2" /><Skeleton className="h-44" /></div>}>
      <GroupsScreen />
    </Suspense>
  );
}
