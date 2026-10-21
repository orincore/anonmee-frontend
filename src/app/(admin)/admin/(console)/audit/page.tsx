import type { Metadata } from "next";
import { AuditScreen } from "@/features/admin/components/audit-screen";

export const metadata: Metadata = { title: "Audit log" };
export const instant = false;

export default function Page() {
  return <AuditScreen />;
}
