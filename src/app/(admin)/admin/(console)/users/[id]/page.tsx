import { Suspense } from "react";
import type { Metadata } from "next";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "User" };
export const instant = false;

export function generateStaticParams() {
  return [{ id: "preview" }];
}

async function UserDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UserDetailScreen id={id} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <UserDetailContent params={params} />
    </Suspense>
  );
}
