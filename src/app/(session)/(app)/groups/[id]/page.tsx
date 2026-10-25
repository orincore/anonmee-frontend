import type { Metadata } from "next";
import { RoomScreen } from "@/features/groups/components/room-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;
export const metadata: Metadata = {
  title: "Group chat",
  openGraph: null,
  twitter: null,
};

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RoomScreen id={id} />;
}
