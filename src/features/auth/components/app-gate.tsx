"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ErrorState, ScreenTimeTracker } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { ChromeProvider } from "@/providers/chrome-provider";
import { SocketProvider } from "@/providers/socket-provider";
import { UnreadProvider } from "@/providers/unread-provider";
import { useAuth } from "@/providers/auth-provider";

/** Guards the signed-in app: guests go to log in; signed-in people get the realtime connection and the shell. */
export function AppGate({ children }: { children: React.ReactNode }) {
  const { state, retry } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (state.status === "guest") {
      router.replace("/login");
    } else if (state.status === "authed" && !state.me.emailVerified) {
      router.replace("/verify-email");
    }
  }, [state, router]);

  if (state.status === "offline") {
    return <div className="mx-auto w-full max-w-xl px-4 pt-24"><ErrorState message="Cannot reach Anonmee. Check your connection." onRetry={retry} /></div>;
  }
  if (state.status !== "authed" || !state.me.emailVerified) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pt-16" aria-busy>
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }
  return (
    <SocketProvider>
      <UnreadProvider>
        <ChromeProvider>
          <ScreenTimeTracker />
          <AppShell>{children}</AppShell>
        </ChromeProvider>
      </UnreadProvider>
    </SocketProvider>
  );
}
