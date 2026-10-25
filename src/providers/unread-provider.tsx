"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EV, type ChatMessage } from "@/contracts";
import { api } from "@/lib/api";
import { emitAck } from "@/lib/socket";
import { useSocket } from "./socket-provider";

interface UnreadContextValue {
  globalUnread: number;
  groupsUnread: number;
  groupUnreads: Record<string, number>;
  markAsRead: (roomId: string, seq?: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const UnreadContext = createContext<UnreadContextValue>({
  globalUnread: 0,
  groupsUnread: 0,
  groupUnreads: {},
  markAsRead: async () => {},
  refresh: async () => {},
});

export function UnreadProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  const pathname = usePathname();

  const [globalUnread, setGlobalUnread] = useState(0);
  const [groupUnreads, setGroupUnreads] = useState<Record<string, number>>({});

  const groupsUnread = useMemo(() => {
    return Object.values(groupUnreads).reduce((acc, n) => acc + (n || 0), 0);
  }, [groupUnreads]);

  const activeRoomId = useMemo(() => {
    if (!pathname) return null;
    if (pathname === "/groups/global") return "global";
    if (pathname.startsWith("/groups/")) {
      const seg = pathname.slice("/groups/".length).split("/")[0];
      return seg || null;
    }
    return null;
  }, [pathname]);

  const activeRoomIdRef = useRef(activeRoomId);
  useEffect(() => {
    activeRoomIdRef.current = activeRoomId;
  }, [activeRoomId]);

  const refresh = useCallback(async () => {
    try {
      const res = await api<{ global: number; groups: Record<string, number>; totalGroups: number }>("/rooms/unread");
      const currentActive = activeRoomIdRef.current;
      setGlobalUnread(currentActive === "global" ? 0 : res.global);
      if (currentActive && currentActive !== "global") {
        const filtered = { ...res.groups };
        delete filtered[currentActive];
        setGroupUnreads(filtered);
      } else {
        setGroupUnreads(res.groups || {});
      }
    } catch {
      // offline or not logged in yet
    }
  }, []);

  const markAsRead = useCallback(
    async (roomId: string, seq?: number) => {
      if (roomId === "global") {
        setGlobalUnread(0);
      } else {
        setGroupUnreads((prev) => {
          if (!prev[roomId]) return prev;
          const next = { ...prev };
          delete next[roomId];
          return next;
        });
      }

      if (socket && socket.connected) {
        void emitAck(socket, EV.roomRead, seq !== undefined ? { roomId, seq } : { roomId });
      } else {
        void api("/rooms/read", { method: "POST", body: { roomId, seq } }).catch(() => {});
      }
    },
    [socket],
  );

  // Sync on initial mount & socket connect
  useEffect(() => {
    void refresh();
    if (!socket) return;
    socket.on("connect", refresh);
    return () => {
      socket.off("connect", refresh);
    };
  }, [socket, refresh]);

  // When navigating to a room, clear its unread badge
  useEffect(() => {
    if (!activeRoomId) return;
    void markAsRead(activeRoomId);
  }, [activeRoomId, markAsRead]);

  // Real-time message listener
  useEffect(() => {
    if (!socket) return;
    const onMessage = (m: ChatMessage) => {
      const currentActive = activeRoomIdRef.current;
      if (m.roomId === "global") {
        if (currentActive === "global") {
          if (socket.connected) {
            void emitAck(socket, EV.roomRead, { roomId: "global", seq: m.seq });
          }
          return;
        }
        setGlobalUnread((n) => n + 1);
      } else {
        if (currentActive === m.roomId) {
          if (socket.connected) {
            void emitAck(socket, EV.roomRead, { roomId: m.roomId, seq: m.seq });
          }
          return;
        }
        setGroupUnreads((prev) => ({
          ...prev,
          [m.roomId]: (prev[m.roomId] ?? 0) + 1,
        }));
      }
    };

    socket.on(EV.roomMessage, onMessage);
    return () => {
      socket.off(EV.roomMessage, onMessage);
    };
  }, [socket]);

  const value = useMemo(
    () => ({
      globalUnread,
      groupsUnread,
      groupUnreads,
      markAsRead,
      refresh,
    }),
    [globalUnread, groupsUnread, groupUnreads, markAsRead, refresh],
  );

  return <UnreadContext.Provider value={value}>{children}</UnreadContext.Provider>;
}

export const useUnread = () => useContext(UnreadContext);
