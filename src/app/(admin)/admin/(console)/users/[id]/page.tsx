import { Suspense } from "react";
import type { Metadata } from "next";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export const instant = false;

export function generateStaticParams() {
  return [{ id: "preview" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  "use cache";
  const { id } = await params;
  return { title: `User ${id}` };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <UserDetailScreen id={id} />
    </Suspense>
  );
}
