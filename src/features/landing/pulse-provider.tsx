"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { EV, type PulseEvent } from "@/contracts";
import { SITE } from "@/lib/site";

interface Pulse {
  /** People online right now, or null until the first answer. */
  online: number | null;
  chatsToday: number | null;
  events: PulseEvent[];
}
const PulseContext = createContext<Pulse>({ online: null, chatsToday: null, events: [] });

/**
 * What is happening on Anonmee right now, for signed-out visitors: one HTTP read for an instant first
 * paint, then the public socket (which carries only the online count and anonymous activity lines).
 */
export function PulseProvider({ children }: { children: React.ReactNode }) {
  const [pulse, setPulse] = useState<Pulse>({ online: null, chatsToday: null, events: [] });

  useEffect(() => {
    const abort = new AbortController();
    fetch(`${SITE.api}/stats/pulse`, { signal: abort.signal })
      .then((r) => r.json())
      .then((d: { online: number; chatsToday: number; events: PulseEvent[] }) => setPulse((p) => ({ online: p.online ?? d.online, chatsToday: d.chatsToday, events: p.events.length ? p.events : d.events })))
      .catch(() => {});

    // A short delay keeps the connection from competing with the first paint.
    let socket: ReturnType<typeof io> | undefined;
    const timer = window.setTimeout(() => {
      socket = io(`${SITE.api}/public`, { transports: ["websocket"], reconnectionDelayMax: 10_000 });
      socket.on(EV.presenceCount, (d: { count: number }) => setPulse((p) => ({ ...p, online: d.count })));
      socket.on(EV.pulse, (e: PulseEvent) => setPulse((p) => ({ ...p, chatsToday: e.kind === "match" ? (p.chatsToday ?? 0) + 1 : p.chatsToday, events: [e, ...p.events].slice(0, 12) })));
    }, 800);
    return () => {
      abort.abort();
      window.clearTimeout(timer);
      socket?.disconnect();
    };
  }, []);

  const value = useMemo(() => pulse, [pulse]);
  return <PulseContext.Provider value={value}>{children}</PulseContext.Provider>;
}

export const usePulse = () => useContext(PulseContext);
