"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { EV } from "@/contracts";
import { createSocket } from "@/lib/socket";
import { SITE } from "@/lib/site";
import { useAuth } from "./auth-provider";

interface SocketValue {
  /** The one shared connection. Null until the provider has mounted. */
  socket: Socket | null;
  connected: boolean;
  /** People online right now, or null until the first count arrives. */
  online: number | null;
}

// Module-level cache so the online count persists across any provider remounts or page switches
let cachedOnline: number | null = null;

const SocketContext = createContext<SocketValue>({ socket: null, connected: false, online: null });

/** Owns the only socket in the app. Components read it; they never create their own. */
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  const isAuthed = state.status === "authed" && state.me.emailVerified;

  const ref = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState<number | null>(() => cachedOnline);

  // Cold-start preload: fetch active count immediately so there is zero flash of 0 or null
  useEffect(() => {
    if (cachedOnline === null) {
      fetch(`${SITE.api}/stats/pulse`, { credentials: "include" })
        .then((r) => r.json())
        .then((d: { online?: number }) => {
          if (typeof d?.online === "number") {
            cachedOnline = d.online;
            setOnline((prev) => prev ?? d.online ?? null);
          }
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!isAuthed) {
      if (ref.current) {
        ref.current.disconnect();
        ref.current = null;
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    const s = createSocket();
    ref.current = s;
    setSocket(s);
    const on = () => setConnected(true);
    const off = () => setConnected(false);
    const count = (d: { count: number }) => {
      cachedOnline = d.count;
      setOnline(d.count);
    };

    // The login token lasts 15 minutes. If a reconnect is refused for that reason, renew the session quietly and try once more.
    let renewing = false;
    const refused = async (err: Error) => {
      if (err.message !== "unauthorized" || renewing) return;
      renewing = true;
      const ok = await fetch(`${SITE.api}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: "{}",
      })
        .then((r) => r.ok)
        .catch(() => false);
      renewing = false;
      if (ok) s.connect();
    };

    s.on("connect", on).on("disconnect", off).on("connect_error", refused).on(EV.presenceCount, count);
    s.connect();

    return () => {
      s.off("connect", on).off("disconnect", off).off("connect_error", refused).off(EV.presenceCount, count).disconnect();
      ref.current = null;
    };
  }, [isAuthed]);

  const value = useMemo(() => ({ socket, connected, online }), [socket, connected, online]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export const useSocket = () => useContext(SocketContext);
