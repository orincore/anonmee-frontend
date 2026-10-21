import type { Metadata } from "next";
import { AnalyticsScreen } from "@/features/admin/components/analytics-screen";

export const metadata: Metadata = { title: "Traffic" };
export const instant = false;

export default function Page() {
  return <AnalyticsScreen />;
}
