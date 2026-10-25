import { Suspense } from "react";
import type { Metadata } from "next";
import { RoomScreen } from "@/features/groups/components/room-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export function generateStaticParams() {
  return [{ id: "preview" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  "use cache";
  await params;
  return { title: "Group chat" };
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <RoomScreen id={id} />
    </Suspense>
  );
}
