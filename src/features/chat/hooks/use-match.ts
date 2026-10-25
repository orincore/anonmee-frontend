"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { EV, type PeerView } from "@/contracts";
import { emitAck } from "@/lib/socket";
import { useSocket } from "@/providers/socket-provider";
import type { ChatSession } from "../types";

export type Phase =
  | { kind: "idle"; error?: string }
  | { kind: "searching" }
  | { kind: "timeout" }
  | { kind: "chatting"; chat: ChatSession; ended: boolean };

type Action =
  | { t: "idle"; error?: string }
  | { t: "searching" }
  | { t: "timeout" }
  | { t: "chat"; chat: ChatSession }
  | { t: "ended"; roomId?: string };

function reduce(s: Phase, a: Action): Phase {
  switch (a.t) {
    case "idle": return { kind: "idle", error: a.error };
    case "searching": return { kind: "searching" };
    case "timeout": return s.kind === "searching" ? { kind: "timeout" } : s;
    case "chat": return { kind: "chatting", chat: a.chat, ended: false };
    case "ended": return s.kind === "chatting" && (!a.roomId || s.chat.id === a.roomId) ? { ...s, ended: true } : s;
  }
}

/** The waiting screen never flashes: a match that lands sooner than this waits until this long has passed. */
const MIN_WAIT_MS = 600;

interface FoundPayload { chatId: string; you: PeerView; peer: PeerView }

/** Everything about finding someone: start, cancel, time out, connect, reconnect, and leave. */
export function useMatch() {
  const { socket } = useSocket();
  const [phase, dispatch] = useReducer(reduce, { kind: "idle" } as Phase);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!socket) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const found = (p: FoundPayload) => {
      const wait = Math.max(0, MIN_WAIT_MS - (Date.now() - startedAt.current));
      timers.push(setTimeout(() => dispatch({ t: "chat", chat: { id: p.chatId, you: p.you, peer: p.peer } }), wait));
    };
    const active = (p: FoundPayload) => dispatch({ t: "chat", chat: { id: p.chatId, you: p.you, peer: p.peer } });
    const waiting = () => {
      startedAt.current = Date.now();
      dispatch({ t: "searching" });
    };
    const timeout = () => dispatch({ t: "timeout" });
    const ended = (p: { roomId: string; reason?: string }) => {
      if (p.reason === "skipped") {
        startedAt.current = Date.now();
        dispatch({ t: "searching" });
        return;
      }
      dispatch({ t: "ended", roomId: p.roomId });
    };
    socket.on(EV.matchFound, found).on(EV.chatActive, active).on("match:waiting", waiting).on(EV.matchTimeout, timeout).on(EV.chatEnd, ended);
    return () => {
      timers.forEach(clearTimeout);
      socket.off(EV.matchFound, found).off(EV.chatActive, active).off("match:waiting", waiting).off(EV.matchTimeout, timeout).off(EV.chatEnd, ended);
    };
  }, [socket]);

  const start = useCallback(async () => {
    if (!socket) return;
    startedAt.current = Date.now();
    dispatch({ t: "searching" }); // shown at once: "Waiting, finding a match for you"
    const r = await emitAck(socket, EV.matchJoin);
    if (!r.ok && r.error !== "in_chat") dispatch({ t: "idle", error: r.message });
  }, [socket]);

  const cancel = useCallback(async () => {
    dispatch({ t: "idle" });
    if (socket) await emitAck(socket, EV.matchLeave);
  }, [socket]);

  const leave = useCallback(async () => {
    if (phase.kind !== "chatting" || !socket) return;
    dispatch({ t: "ended" });
    await emitAck(socket, EV.chatEnd, { roomId: phase.chat.id });
  }, [socket, phase]);

  const skip = useCallback(async () => {
    if (phase.kind !== "chatting" || !socket) return;
    const roomId = phase.chat.id;
    startedAt.current = Date.now();
    dispatch({ t: "searching" });
    const r = await emitAck(socket, EV.chatSkip, { roomId });
    if (!r.ok && r.error !== "chat_ended") {
      dispatch({ t: "idle", error: r.message });
    }
  }, [socket, phase]);

  return { phase, start, cancel, leave, skip, reset: () => dispatch({ t: "idle" }) };
}
