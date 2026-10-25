import { Suspense } from "react";
import type { Metadata } from "next";
import { RoomScreen } from "@/features/groups/components/room-screen";
import { Skeleton } from "@/components/ui/skeleton";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Group chat" };

async function RoomContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RoomScreen id={id} />;
}

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <RoomContent params={params} />
    </Suspense>
  );
}
