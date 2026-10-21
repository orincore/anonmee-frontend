"use client";

import { CaretLeft, DotsThreeVertical, UsersThree } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Composer, ErrorState, MessageList, ReportSheet, type ChatLine } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ChatMenuSheet } from "@/features/chat/components/chat-menu-sheet";
import { useModeration } from "@/hooks/use-moderation";
import { useViewportHeight } from "@/hooks/use-viewport-height";
import { useImmersive } from "@/providers/chrome-provider";
import { useRoom } from "../hooks/use-room";
import { MembersSheet } from "./members-sheet";

export interface RoomViewProps {
  roomId: string;
  title: string;
  subtitle: string;
  /** False until we are allowed in (for groups, after joining). */
  enabled: boolean;
  /** Groups can be left; the global room cannot. */
  onLeave?: () => void;
  showMembers: boolean;
}

/** A group or the global room: header, a virtualised message list that pages back through history, and the composer. */
export function RoomView({ roomId, title, subtitle, enabled, onLeave, showMembers }: RoomViewProps) {
  useImmersive(true);
  useViewportHeight();
  const { lines, hasMore, loadingOlder, error, loadOlder, send, retry, react } = useRoom(roomId, enabled);
  const [replying, setReplying] = useState<ChatLine>();
  const [focusTick, setFocusTick] = useState(0);
  const { report, block } = useModeration(roomId);
  const [members, setMembers] = useState(false);
  const [menu, setMenu] = useState(false);
  // Two separate choices: whose menu is open, and whom you are reporting. Opening the report closes the menu.
  const [menuFor, setMenuFor] = useState<ChatLine>();
  const [reportFor, setReportFor] = useState<ChatLine>();

  return (
    <section aria-label={title} className="flex h-[var(--vvh,100dvh)] flex-col bg-bg md:h-[100dvh]">
      <header className="flex items-center gap-2 border-b-2 border-edge px-2 py-3 md:px-4">
        <Button asChild variant="ghost" size="icon" aria-label="Back to groups">
          <Link href="/groups"><CaretLeft aria-hidden weight="bold" className="size-6" /></Link>
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="display truncate text-2xl leading-none">{title}</h1>
          <p className="truncate text-sm text-muted">{subtitle}</p>
        </div>
        {showMembers ? <Button variant="ghost" size="icon" aria-label="See who is here" onClick={() => setMembers(true)}><UsersThree aria-hidden weight="bold" className="size-6" /></Button> : null}
        {onLeave ? <Button variant="ghost" size="icon" aria-label="Group options" onClick={() => setMenu(true)}><DotsThreeVertical aria-hidden weight="bold" className="size-6" /></Button> : null}
      </header>
      {error ? (
        <div className="p-4"><ErrorState message={error} /></div>
      ) : (
        <MessageList lines={lines} showAuthors hasMore={hasMore} loadingOlder={loadingOlder} onLoadOlder={loadOlder} onRetry={retry} onAuthorTap={setMenuFor} onReply={(l) => { setReplying(l); setFocusTick((t) => t + 1); }} onReact={react} empty={<p className="max-w-xs text-center text-lg text-muted">It is quiet in here. Say something first.</p>} />
      )}
      <Composer onSend={(t) => { send(t, replying); setReplying(undefined); }} disabled={!enabled || !!error} placeholder="Message the room" replyingTo={replying} focusSignal={focusTick} onCancelReply={() => setReplying(undefined)} />
      {showMembers ? <MembersSheet open={members} onOpenChange={setMembers} groupId={roomId} /> : null}
      <ChatMenuSheet open={menu} onOpenChange={setMenu} alias={title} description="Leave this group any time." onReport={() => {}} onBlock={async () => {}} onLeave={onLeave} hideSafety />
      <ChatMenuSheet open={!!menuFor} onOpenChange={(o) => !o && setMenuFor(undefined)} alias={menuFor?.alias ?? ""} description={`${menuFor?.alias ?? "They"} is in this room.`} onReport={() => setReportFor(menuFor)} onBlock={() => block(menuFor!.alias)} />
      <ReportSheet open={!!reportFor} onOpenChange={(o) => !o && setReportFor(undefined)} alias={reportFor?.alias ?? ""} onSubmit={(reason, details) => report(reportFor!.alias, reason, details)} />
    </section>
  );
}
