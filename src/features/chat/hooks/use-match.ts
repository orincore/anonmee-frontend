"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { EV, type PeerView } from "@/contracts";
import { emitAck } from "@/lib/socket";
import { useSocket } from "@/providers/socket-provider";
import type { ChatSession } from "../types";

export type Phase =
  /** The page has just loaded or reconnected and has not heard yet whether a chat is already running. */
  | { kind: "loading" }
  | { kind: "idle"; error?: string }
  | { kind: "searching"; notice?: string }
  | { kind: "timeout" }
  | { kind: "chatting"; chat: ChatSession; ended: boolean; endedReason?: string };

type Action =
  | { t: "restored"; chat: ChatSession | null; waiting: boolean }
  | { t: "idle"; error?: string }
  | { t: "searching"; notice?: string }
  | { t: "timeout" }
  | { t: "chat"; chat: ChatSession }
  | { t: "ended"; roomId?: string; reason?: string };

function reduce(s: Phase, a: Action): Phase {
  switch (a.t) {
    case "restored":
      // Already showing this very chat: leave it alone, so nothing flickers or loses its place.
      if (a.chat) return s.kind === "chatting" && s.chat.id === a.chat.id ? s : { kind: "chatting", chat: a.chat, ended: false };
      if (a.waiting) return s.kind === "searching" ? s : { kind: "searching" };
      return s.kind === "loading" ? { kind: "idle" } : s;
    case "idle": return { kind: "idle", error: a.error };
    case "searching": return { kind: "searching", notice: a.notice };
    case "timeout": return s.kind === "searching" ? { kind: "timeout" } : s;
    case "chat": return { kind: "chatting", chat: a.chat, ended: false };
    case "ended": return s.kind === "chatting" && (!a.roomId || s.chat.id === a.roomId) ? { ...s, ended: true, endedReason: a.reason } : s;
  }
}

/** The waiting screen never flashes: a match that lands sooner than this waits until this long has passed. */
const MIN_WAIT_MS = 600;

interface FoundPayload { chatId: string; you: PeerView; peer: PeerView }

/** Everything about finding someone: start, cancel, time out, connect, reconnect, and leave. */
export function useMatch() {
  const { socket } = useSocket();
  const [phase, dispatch] = useReducer(reduce, { kind: "loading" } as Phase);
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
      if (p.reason === "peer_left") {
        // They closed the page and did not come back. Same as a skip: straight to the next person.
        startedAt.current = Date.now();
        dispatch({ t: "searching", notice: "The other user left the chat. Connecting you to a new user." });
        return;
      }
      if (p.reason === "peer_skipped") {
        // The other user left. Same waiting screen as any match, with a line saying why.
        startedAt.current = Date.now();
        dispatch({ t: "searching", notice: "The other user skipped the chat. Connecting you to a new user." });
        return;
      }
      dispatch({ t: "ended", roomId: p.roomId, reason: p.reason });
    };
    // Ask which chat this person is in, now and after every reconnect. The server also pushes it at connect, but a
    // push can arrive before this page is listening; asking cannot be missed, so a refresh never loses the chat.
    const ask = async () => {
      const r = await emitAck<{ chat: { chatId: string; you: PeerView; peer: PeerView } | null; waiting: boolean }>(socket, EV.chatCurrent);
      if (!r.ok) return dispatch({ t: "restored", chat: null, waiting: false }); // never leave the page on a spinner
      dispatch({ t: "restored", chat: r.chat ? { id: r.chat.chatId, you: r.chat.you, peer: r.chat.peer } : null, waiting: r.waiting });
    };
    void ask();
    socket.on("connect", ask);
    socket.on(EV.matchFound, found).on(EV.chatActive, active).on("match:waiting", waiting).on(EV.matchTimeout, timeout).on(EV.chatEnd, ended);
    return () => {
      timers.forEach(clearTimeout);
      socket.off("connect", ask);
      socket.off(EV.matchFound, found).off(EV.chatActive, active).off("match:waiting", waiting).off(EV.matchTimeout, timeout).off(EV.chatEnd, ended);
    };
  }, [socket]);

  // Tell the server the page is closing. A refresh comes straight back and keeps the chat; a closed tab does not,
  // and the server then skips the chat instead of leaving the other person waiting half a minute.
  const chatId = phase.kind === "chatting" && !phase.ended ? phase.chat.id : null;
  useEffect(() => {
    if (!socket || !chatId) return;
    const leaving = () => socket.emit(EV.chatLeaving, { roomId: chatId });
    window.addEventListener("pagehide", leaving);
    return () => window.removeEventListener("pagehide", leaving);
  }, [socket, chatId]);

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
