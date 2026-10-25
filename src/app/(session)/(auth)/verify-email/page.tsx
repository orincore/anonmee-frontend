import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthFrame } from "@/features/auth/components/auth-frame";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <AuthFrame
      title="Check your inbox"
      subtitle="Enter the 6-digit verification code to activate your Anonmee account."
    >
      <Suspense fallback={<div className="space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>}>
        <VerifyEmailForm />
      </Suspense>
    </AuthFrame>
  );
}
