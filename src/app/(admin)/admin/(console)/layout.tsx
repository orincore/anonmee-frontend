import type { Metadata } from "next";
import { AdminGate } from "@/features/admin/components/admin-gate";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};
export const instant = false;

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
