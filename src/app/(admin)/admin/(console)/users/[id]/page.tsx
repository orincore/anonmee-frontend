"use client";

import { use } from "react";
import { UserDetailScreen } from "@/features/admin/components/user-detail-screen";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <UserDetailScreen id={id} />;
}
