import type { Metadata } from "next";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export const instant = false;
export const metadata: Metadata = {
  title: "User",
  openGraph: null,
  twitter: null,
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserDetailScreen id={id} />;
}
