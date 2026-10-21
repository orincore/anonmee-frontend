"use client";

import { BottomTabBar } from "./bottom-tab-bar";
import { Sidebar } from "./sidebar";
import { useSocket } from "@/providers/socket-provider";

/** Frame for every signed-in screen: rail on desktop, tab bar on phones. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { online } = useSocket();
  return (
    <div className="flex min-h-[100dvh]">
      <Sidebar online={online} />
      <main className="min-w-0 flex-1">{children}</main>
      <BottomTabBar />
    </div>
  );
}
