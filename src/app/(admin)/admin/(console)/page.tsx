import type { Metadata } from "next";
import { OverviewScreen } from "@/features/admin/components/overview-screen";

export const metadata: Metadata = { title: "Overview" };
export const instant = false;

export default function Page() {
  return <OverviewScreen />;
}
