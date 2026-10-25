"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ScreenTimeTracker } from "@/components/shared";
import { ChromeProvider } from "@/providers/chrome-provider";
import { useAuth } from "@/providers/auth-provider";
import type { PublicGroup } from "@/lib/public-groups";
import { GroupsScreen } from "./groups-screen";
import { PublicGroupsDirectory } from "./public-groups-directory";

export interface GroupsViewContainerProps {
  initialGroups: PublicGroup[];
}

/**
 * Groups Container:
 * - When authed: renders the interactive GroupsScreen with real-time feed, filters, and "Start a Group" modal.
 * - When guest or search engine: renders the crawlable, SEO-rich public groups directory.
 */
export function GroupsViewContainer({ initialGroups }: GroupsViewContainerProps) {
  const { state } = useAuth();

  if (state.status === "authed" && state.me.emailVerified) {
    return (
      <ChromeProvider>
        <ScreenTimeTracker />
        <AppShell>
          <GroupsScreen />
        </AppShell>
      </ChromeProvider>
    );
  }

  return <PublicGroupsDirectory initialGroups={initialGroups} />;
}
