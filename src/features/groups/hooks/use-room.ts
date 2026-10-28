"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EV, type ChatMessage } from "@/contracts";
import { lastSeq, lineFromMessage, mergeLines, previewOfLine, toggleReaction, type ChatLine } from "@/components/shared/chat-line";
import { emitAck } from "@/lib/socket";
import { useSocket } from "@/providers/socket-provider";

interface JoinAck { alias: string; messages: ChatMessage[]; hasMore: boolean }
const PAGE = 50;

interface RoomCacheEntry {
  lines: ChatLine[];
  you?: string;
  hasMore: boolean;
}

const roomCache = new Map<string, RoomCacheEntry>();

/**
 * A group room or the global room. Joins on connect, shows recent history, loads earlier pages as you scroll up,
 * sends, replies and reacts with instant feedback, and after a dropped connection asks for exactly what it missed.
 */
export function useRoom(roomId: string, enabled: boolean) {
  const { socket, connected } = useSocket();
  const cached = roomCache.get(roomId);
  const [lines, setLines] = useState<ChatLine[]>(() => cached?.lines ?? []);
  const [you, setYou] = useState<string | undefined>(() => cached?.you);
  const [hasMore, setHasMore] = useState(() => cached?.hasMore ?? false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [error, setError] = useState<string>();
  const [typists, setTypists] = useState<string[]>([]);
  const linesRef = useRef(lines);
  const youRef = useRef<string | undefined>(cached?.you);
  const joiningRef = useRef(false);
  const typistsTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    linesRef.current = lines;
    roomCache.set(roomId, {
      lines,
      you: youRef.current,
      hasMore,
    });
  }, [lines, roomId, hasMore]);

  const toLine = useCallback((m: ChatMessage) => lineFromMessage(m, youRef.current ?? ""), []);

  const join = useCallback(async () => {
    if (!socket || !enabled || joiningRef.current) return;
    joiningRef.current = true;
    try {
      const seq = lastSeq(linesRef.current);
      const r = await emitAck<JoinAck>(socket, EV.roomJoin, seq ? { roomId, lastSeq: seq } : { roomId });
      if (!r.ok) {
        if (linesRef.current.length === 0) {
          setError(r.message);
        }
        return;
      }
      youRef.current = r.alias;
      setYou(r.alias);
      setError(undefined);
      setLines((p) => {
        const merged = mergeLines(p, r.messages.map(toLine));
        roomCache.set(roomId, { lines: merged, you: r.alias, hasMore: !seq ? r.hasMore : hasMore });
        return merged;
      });
      if (!seq) setHasMore(r.hasMore);
    } finally {
      joiningRef.current = false;
    }
  }, [socket, enabled, roomId, toLine, hasMore]);

  useEffect(() => {
    if (!socket || !enabled) return;

    if (connected) {
      void join();
    }

    const onConnect = () => {
      void join();
    };

    const onMessage = (m: ChatMessage) => {
      if (m.roomId === roomId) {
        setLines((p) => mergeLines(p, [toLine(m)]));
      }
    };

    const onReactions = (d: { roomId: string; messageId: string; reactions: Record<string, number> }) => {
      if (d.roomId === roomId) {
        setLines((p) => p.map((l) => (l.id === d.messageId ? { ...l, reactions: d.reactions } : l)));
      }
    };

    const onTyping = (d: { roomId: string; typists: string[] }) => {
      if (d.roomId === roomId) {
        const others = d.typists.filter((t) => t !== youRef.current && t !== you);
        setTypists(others);
        clearTimeout(typistsTimer.current);
        typistsTimer.current = setTimeout(() => setTypists([]), 4500);
      }
    };

    socket.on(EV.roomMessage, onMessage);
    socket.on(EV.roomReactions, onReactions);
    socket.on(EV.roomTyping, onTyping);
    socket.on("connect", onConnect);

    return () => {
      clearTimeout(typistsTimer.current);
      socket.off(EV.roomMessage, onMessage);
      socket.off(EV.roomReactions, onReactions);
      socket.off(EV.roomTyping, onTyping);
      socket.off("connect", onConnect);
      if (roomId !== "global") {
        void emitAck(socket, EV.roomLeave, { roomId }).catch(() => {});
      }
    };
  }, [socket, connected, enabled, roomId, join, toLine]);

  const loadOlder = useCallback(async () => {
    const first = linesRef.current.find((l) => l.seq !== undefined)?.seq;
    if (!socket || !first || loadingOlder) return;
    setLoadingOlder(true);
    const r = await emitAck<{ messages: ChatMessage[]; hasMore: boolean }>(socket, EV.roomHistory, { roomId, beforeSeq: first, limit: PAGE });
    if (r.ok) {
      setLines((p) => mergeLines(p, r.messages.map(toLine)));
      setHasMore(r.hasMore);
    }
    setLoadingOlder(false);
  }, [socket, roomId, loadingOlder, toLine]);

  const transmit = useCallback(
    async (key: string, text: string, replyToId?: string) => {
      if (!socket) return;
      const r = await emitAck<{ seq?: number; id?: string }>(socket, EV.roomMessage, { roomId, clientMsgId: key, text, ...(replyToId ? { replyToId } : {}) });
      setLines((p) => p.map((l) => (l.key === key ? { ...l, status: r.ok ? "sent" : "failed", seq: r.ok ? (r.seq ?? l.seq) : l.seq, id: r.ok ? (r.id || l.id) : l.id } : l)));
    },
    [socket, roomId],
  );

  const send = useCallback(
    (text: string, replyTo?: ChatLine) => {
      const alias = youRef.current ?? you;
      if (!alias) {
        void join();
        return;
      }
      const key = crypto.randomUUID();
      const line: ChatLine = { key, alias, gender: "prefer_not_to_say", age: 18, text, at: Date.now(), own: true, status: "sending", replyTo: replyTo?.id ? previewOfLine(replyTo) : undefined };
      setLines((p) => mergeLines(p, [line]));
      void transmit(key, text, replyTo?.id);
    },
    [transmit, you, join],
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
      setLines((p) => p.map((l) => (l.key === line.key ? toggleReaction(l, emoji, on) : l)));
      const r = await emitAck(socket, EV.roomReact, { roomId, messageId: line.id, emoji });
      if (!r.ok) setLines((p) => p.map((l) => (l.key === line.key ? toggleReaction(l, emoji, !on) : l)));
    },
    [socket, roomId],
  );

  const rejoin = useCallback(() => {
    setError(undefined);
    void join();
  }, [join]);

  return { lines, you, hasMore, loadingOlder, error, loadOlder, send, retry, react, rejoin, typists };
}
