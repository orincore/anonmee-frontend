"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth-provider";

/** Shows its children to signed-out visitors; sends signed-in people straight to the app. */
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (state.status === "authed") router.replace("/home");
  }, [state.status, router]);

  if (state.status === "guest") return <>{children}</>;
  return (
    <div className="mx-auto w-full max-w-md space-y-5 px-4 pt-24" aria-busy>
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}
