import type { Metadata } from "next";
import { connection } from "next/server";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export const metadata: Metadata = { title: "User" };
export const instant = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  return <UserDetailScreen id={(await params).id} />;
}
