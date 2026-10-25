import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { RoomScreen } from "@/features/groups/components/room-screen";
import { Skeleton } from "@/components/ui/skeleton";

export const instant = false;
export const metadata: Metadata = { title: "Group chat" };

async function RoomContent({ params }: { params: Promise<{ id: string }> }) {
  await connection();
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
