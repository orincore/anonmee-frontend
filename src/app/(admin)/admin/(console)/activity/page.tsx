import type { Metadata } from "next";
import { ActivityScreen } from "@/features/admin/components/activity-screen";

export const metadata: Metadata = { title: "Screen Time & Activity" };

export default function Page() {
  return <ActivityScreen />;
}
