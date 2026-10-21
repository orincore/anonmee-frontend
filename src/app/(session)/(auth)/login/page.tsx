import type { Metadata } from "next";
import { AuthFrame } from "@/features/auth/components/auth-frame";
import { GuestOnly } from "@/features/auth/components/guest-only";
import { LoginForm } from "@/features/auth/components/login-form";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Log in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <GuestOnly>
      <AuthFrame title="Welcome back" subtitle="Log in to pick up where you left off.">
        <LoginForm />
      </AuthFrame>
    </GuestOnly>
  );
}
