import type { Metadata } from "next";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export const metadata: Metadata = { title: "User" };
export const instant = false;
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <UserDetailScreen id={(await params).id} />;
}
