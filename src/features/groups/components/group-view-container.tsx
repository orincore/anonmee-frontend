"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ScreenTimeTracker } from "@/components/shared";
import { ChromeProvider } from "@/providers/chrome-provider";
import { SocketProvider } from "@/providers/socket-provider";
import { UnreadProvider } from "@/providers/unread-provider";
import { useAuth } from "@/providers/auth-provider";
import type { PublicGroup } from "@/lib/public-groups";
import { RoomScreen } from "./room-screen";
import { PublicGroupPreview } from "./public-group-preview";

export interface GroupViewContainerProps {
  id: string;
  initialGroup: PublicGroup;
}

/**
 * Universal Group Container:
 * - If the user is logged in, provides live real-time WebSocket connection, shell, and room chat.
 * - If the visitor is a guest, search crawler, or unauthenticated, provides an SEO-rich, privacy-compliant public group preview.
 *
 * PRIVACY GUARANTEE:
 * Private chat messages are never sent over SSR or visible to search engines.
 */
export function GroupViewContainer({ id, initialGroup }: GroupViewContainerProps) {
  const { state } = useAuth();

  // If signed in and email verified, load the full live app experience
  if (state.status === "authed" && state.me.emailVerified) {
    return (
      <SocketProvider>
        <UnreadProvider>
          <ChromeProvider>
            <ScreenTimeTracker />
            <AppShell>
              <RoomScreen id={id} />
            </AppShell>
          </ChromeProvider>
        </UnreadProvider>
      </SocketProvider>
    );
  }

  // Otherwise, render the public SEO preview
  return <PublicGroupPreview group={initialGroup} />;
}
