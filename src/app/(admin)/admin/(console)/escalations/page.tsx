import type { Metadata } from "next";
import { EscalationsScreen } from "@/features/admin/components/escalations-screen";

export const metadata: Metadata = { title: "Escalations" };
export const instant = false;

export default function Page() {
  return <EscalationsScreen />;
}
