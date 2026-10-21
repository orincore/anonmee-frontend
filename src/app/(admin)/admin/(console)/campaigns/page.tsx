import type { Metadata } from "next";
import { CampaignsScreen } from "@/features/admin/components/campaigns-screen";

export const metadata: Metadata = { title: "Campaigns" };
export const instant = false;

export default function Page() {
  return <CampaignsScreen />;
}
