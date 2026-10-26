import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export const metadata: Metadata = { title: "User" };
export const instant = false;

async function DynamicMarker() {
  await connection();
  return null;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <UserDetailScreen id={id} />
    </>
  );
}
