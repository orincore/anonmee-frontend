"use client";

import { DotsThreeVertical } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Composer, MessageList, PeerBadge, ReportSheet, type ChatLine } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useModeration } from "@/hooks/use-moderation";
import { useViewportHeight } from "@/hooks/use-viewport-height";
import { useChatSession } from "../hooks/use-chat-session";
import type { ChatSession } from "../types";
import { ChatMenuSheet } from "./chat-menu-sheet";

export interface ChatViewProps {
  chat: ChatSession;
  ended: boolean;
  onLeave: () => void;
  onNext: () => void;
}

/** A live one-to-one chat: who you are talking to, the messages, and the box to reply. */
export function ChatView({ chat, ended, onLeave, onNext }: ChatViewProps) {
  useViewportHeight();
  const { lines, typing, send, retry, react, notifyTyping } = useChatSession(chat);
  const [replying, setReplying] = useState<ChatLine>();
  const [focusTick, setFocusTick] = useState(0);
  const { report, block } = useModeration(chat.id);
  const [menu, setMenu] = useState(false);
  const [reporting, setReporting] = useState(false);

  return (
    <section aria-label={`Chat with ${chat.peer.alias}`} className="flex h-[var(--vvh,100dvh)] flex-col bg-bg md:h-[100dvh]">
      <header className="flex items-center justify-between gap-3 border-b-2 border-edge px-4 py-3">
        <PeerBadge peer={chat.peer} />
        {ended ? null : (
          <Button variant="ghost" size="icon" aria-label="Chat options" onClick={() => setMenu(true)}>
            <DotsThreeVertical aria-hidden weight="bold" className="size-6" />
          </Button>
        )}
      </header>
      <MessageList
        lines={lines}
        typing={typing && !ended}
        onRetry={retry}
        onReply={(l) => { setReplying(l); setFocusTick((t) => t + 1); }}
        onReact={react}
        empty={<p className="max-w-xs text-center text-lg text-muted">You are connected. Say hi to {chat.peer.alias}.</p>}
      />
      {ended ? (
        <div className="space-y-3 border-t-2 border-edge bg-surface p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <p className="text-center font-bold">This chat has ended.</p>
          <Button size="lg" block onClick={onNext}>
            Find someone new
          </Button>
          <Button asChild variant="ghost" block>
            <Link href="/home">Back home</Link>
          </Button>
        </div>
      ) : (
        <Composer onSend={(t) => { send(t, replying); setReplying(undefined); }} onTyping={notifyTyping} replyingTo={replying} focusSignal={focusTick} onCancelReply={() => setReplying(undefined)} />
      )}
      <ChatMenuSheet open={menu} onOpenChange={setMenu} alias={chat.peer.alias} onReport={() => setReporting(true)} onBlock={() => block(chat.peer.alias)} onLeave={onLeave} />
      <ReportSheet open={reporting} onOpenChange={setReporting} alias={chat.peer.alias} onSubmit={(reason, details) => report(chat.peer.alias, reason, details)} />
    </section>
  );
}
