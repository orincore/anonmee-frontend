import type { Metadata } from "next";
import { AuthFrame } from "@/features/auth/components/auth-frame";
import { GuestOnly } from "@/features/auth/components/guest-only";
import { SignupWizard } from "@/features/auth/components/signup-wizard";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Create account", robots: { index: false, follow: false } };

export default function SignupPage() {
  return (
    <GuestOnly>
      <AuthFrame title="Join Anonmee" subtitle="Five quick steps. Under a minute.">
        <SignupWizard />
      </AuthFrame>
    </GuestOnly>
  );
}
