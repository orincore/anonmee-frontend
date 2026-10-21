"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EV, type ChatMessage } from "@/contracts";
import { lastSeq, lineFromMessage, mergeLines, previewOfLine, toggleReaction, type ChatLine } from "@/components/shared/chat-line";
import { emitAck } from "@/lib/socket";
import { useSocket } from "@/providers/socket-provider";
import type { ChatSession } from "../types";

/**
 * Messages for one-to-one chat. Sending is instant: your message appears at once as "sending", turns "sent" when the
 * server confirms, or "failed" with a retry. Replies and reactions answer instantly too. After a dropped
 * connection it asks for exactly what it missed.
 */
export function useChatSession(chat: ChatSession) {
  const { socket } = useSocket();
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [typing, setTyping] = useState(false);
  const linesRef = useRef(lines);
  const typingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastTypingSent = useRef(0);

  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  const resume = useCallback(async () => {
    if (!socket) return;
    const r = await emitAck<{ messages: ChatMessage[] }>(socket, EV.chatResume, { roomId: chat.id, lastSeq: lastSeq(linesRef.current) });
    if (r.ok) setLines((p) => mergeLines(p, r.messages.map((m) => lineFromMessage(m, chat.you.alias))));
  }, [socket, chat.id, chat.you.alias]);

  useEffect(() => {
    if (!socket) return;
    void resume();
    const onMessage = (m: ChatMessage) => {
      if (m.roomId !== chat.id) return;
      setLines((p) => mergeLines(p, [lineFromMessage(m, chat.you.alias)]));
      if (m.alias !== chat.you.alias) setTyping(false);
    };
    const onTyping = (d: { roomId: string }) => {
      if (d.roomId !== chat.id) return;
      setTyping(true);
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => setTyping(false), 3000);
    };
    // The server's counts are the truth; they replace whatever we guessed.
    const onReactions = (d: { roomId: string; messageId: string; reactions: Record<string, number> }) =>
      d.roomId === chat.id && setLines((p) => p.map((l) => (l.id === d.messageId ? { ...l, reactions: d.reactions } : l)));
    socket.on(EV.chatMessage, onMessage).on(EV.chatTyping, onTyping).on(EV.chatReactions, onReactions).on("connect", resume);
    return () => {
      clearTimeout(typingTimer.current);
      socket.off(EV.chatMessage, onMessage).off(EV.chatTyping, onTyping).off(EV.chatReactions, onReactions).off("connect", resume);
    };
  }, [socket, chat.id, chat.you.alias, resume]);

  const transmit = useCallback(
    async (key: string, text: string, replyToId?: string) => {
      if (!socket) return;
      const r = await emitAck<{ seq?: number; id?: string }>(socket, EV.chatMessage, { roomId: chat.id, clientMsgId: key, text, ...(replyToId ? { replyToId } : {}) });
      setLines((p) => p.map((l) => (l.key === key ? { ...l, status: r.ok ? "sent" : "failed", seq: r.ok ? (r.seq ?? l.seq) : l.seq, id: r.ok ? (r.id ?? l.id) : l.id } : l)));
    },
    [socket, chat.id],
  );

  const send = useCallback(
    (text: string, replyTo?: ChatLine) => {
      const key = crypto.randomUUID();
      const line: ChatLine = { key, alias: chat.you.alias, gender: chat.you.gender, age: chat.you.age, text, at: Date.now(), own: true, status: "sending", replyTo: replyTo?.id ? previewOfLine(replyTo) : undefined };
      setLines((p) => mergeLines(p, [line]));
      void transmit(key, text, replyTo?.id);
    },
    [chat.you, transmit],
  );

  const retry = useCallback(
    (key: string) => {
      const l = linesRef.current.find((x) => x.key === key);
      if (!l) return;
      setLines((p) => p.map((x) => (x.key === key ? { ...x, status: "sending" } : x)));
      void transmit(key, l.text, l.replyTo?.id);
    },
    [transmit],
  );

  const react = useCallback(
    async (line: ChatLine, emoji: string) => {
      if (!socket || !line.id) return;
      const on = !line.mine?.includes(emoji);
      setLines((p) => p.map((l) => (l.key === line.key ? toggleReaction(l, emoji, on) : l))); // instant
      const r = await emitAck(socket, EV.chatReact, { roomId: chat.id, messageId: line.id, emoji });
      if (!r.ok) setLines((p) => p.map((l) => (l.key === line.key ? toggleReaction(l, emoji, !on) : l))); // put it back
    },
    [socket, chat.id],
  );

  const notifyTyping = useCallback(() => {
    if (!socket || Date.now() - lastTypingSent.current < 2000) return;
    lastTypingSent.current = Date.now();
    socket.emit(EV.chatTyping, { roomId: chat.id });
  }, [socket, chat.id]);

  return { lines, typing, send, retry, react, notifyTyping };
}
