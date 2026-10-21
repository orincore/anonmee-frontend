import type { Metadata } from "next";
import { UsersScreen } from "@/features/admin/components/users-screen";

export const metadata: Metadata = { title: "Users" };
export const instant = false;

export default function Page() {
  return <UsersScreen />;
}
