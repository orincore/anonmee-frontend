import type { Metadata } from "next";
import { AdminLogin } from "@/features/admin/components/admin-login";

export const metadata: Metadata = { title: "Staff sign in", robots: { index: false, follow: false } };
// The staff area is behind a browser-side sign-in, so there is nothing to pre-render (see (session)/layout.tsx).
export const dynamic = "force-dynamic";
export const instant = false;

export default function AdminLoginPage() {
  return <AdminLogin />;
}
