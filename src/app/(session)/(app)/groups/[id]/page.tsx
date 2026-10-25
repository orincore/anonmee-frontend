import type { Metadata } from "next";
import { connection } from "next/server";
import { RoomScreen } from "@/features/groups/components/room-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Group chat" };

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  return <RoomScreen id={(await params).id} />;
}
