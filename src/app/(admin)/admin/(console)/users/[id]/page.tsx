import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  return { title: "User" };
}

export const instant = false;

export function generateStaticParams() {
  return [{ id: "preview" }];
}

async function UserDetailContent({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  return <UserDetailScreen id={id} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <UserDetailContent params={params} />
    </Suspense>
  );
}
