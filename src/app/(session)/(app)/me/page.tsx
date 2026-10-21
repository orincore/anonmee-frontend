import type { Metadata } from "next";
import { MeScreen } from "@/features/profile/components/me-screen";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Me" };

export default function MePage() {
  return <MeScreen />;
}
