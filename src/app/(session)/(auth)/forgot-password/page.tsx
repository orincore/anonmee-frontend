import type { Metadata } from "next";
import { AuthFrame } from "@/features/auth/components/auth-frame";
import { ForgotPasswordFlow } from "@/features/auth/components/forgot-password-flow";
import { GuestOnly } from "@/features/auth/components/guest-only";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Reset password", robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return (
    <GuestOnly>
      <AuthFrame title="Reset password" subtitle="We will email you a 6-digit code to choose a new one.">
        <ForgotPasswordFlow />
      </AuthFrame>
    </GuestOnly>
  );
}
