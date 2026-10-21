import type { Metadata } from "next";
import { AppGate } from "@/features/auth/components/app-gate";

// The signed-in app is never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppGate>{children}</AppGate>;
}
