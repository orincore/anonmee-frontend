"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { EV } from "@/contracts";
import { createSocket } from "@/lib/socket";
import { SITE } from "@/lib/site";

interface SocketValue {
  /** The one shared connection. Null until the provider has mounted. */
  socket: Socket | null;
  connected: boolean;
  /** People online right now, or null until the first count arrives. */
  online: number | null;
}
const SocketContext = createContext<SocketValue>({ socket: null, connected: false, online: null });

/** Owns the only socket in the app. Components read it; they never create their own. */
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    const s = createSocket();
    ref.current = s;
    // Exposing the socket to children is the whole job of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(s);
    const on = () => setConnected(true);
    const off = () => setConnected(false);
    const count = (d: { count: number }) => setOnline(d.count);
    // The login token lasts 15 minutes. If a reconnect is refused for that reason, renew the session quietly and try once more.
    let renewing = false;
    const refused = async (err: Error) => {
      if (err.message !== "unauthorized" || renewing) return;
      renewing = true;
      const ok = await fetch(`${SITE.api}/auth/refresh`, { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" }).then((r) => r.ok).catch(() => false);
      renewing = false;
      if (ok) s.connect();
    };
    s.on("connect", on).on("disconnect", off).on("connect_error", refused).on(EV.presenceCount, count);
    s.connect();
    return () => {
      s.off("connect", on).off("disconnect", off).off("connect_error", refused).off(EV.presenceCount, count).disconnect();
      ref.current = null;
    };
  }, []);

  const value = useMemo(() => ({ socket, connected, online }), [socket, connected, online]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export const useSocket = () => useContext(SocketContext);
