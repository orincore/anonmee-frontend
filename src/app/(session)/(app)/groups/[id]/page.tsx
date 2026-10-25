import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { RoomScreen } from "@/features/groups/components/room-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Group chat" };

export function generateStaticParams() {
  return [];
}

async function RoomContent({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  return <RoomScreen id={id} />;
}

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <RoomContent params={params} />
    </Suspense>
  );
}
