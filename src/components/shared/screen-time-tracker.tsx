"use client";

import { useEffect, useRef } from "react";
import { EV } from "@/contracts";
import { api } from "@/lib/api";
import { SITE } from "@/lib/site";
import { useSocket } from "@/providers/socket-provider";

const FLUSH_INTERVAL_S = 30;
const MIN_FLUSH_S = 5;
const IDLE_TIMEOUT_MS = 120_000; // 2 minutes without user interaction pauses screen time

export function ScreenTimeTracker() {
  const { socket, connected } = useSocket();
  const socketRef = useRef(socket);
  socketRef.current = socket;
  const connectedRef = useRef(connected);
  connectedRef.current = connected;

  const secondsAccumulated = useRef(0);
  const lastInteraction = useRef(Date.now());

  useEffect(() => {
    // Record user interaction timestamps
    const onInteraction = () => {
      lastInteraction.current = Date.now();
    };

    window.addEventListener("mousemove", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });
    window.addEventListener("scroll", onInteraction, { passive: true });
    window.addEventListener("click", onInteraction, { passive: true });

    const flush = (minSeconds = MIN_FLUSH_S) => {
      const toSend = secondsAccumulated.current;
      if (toSend < minSeconds) return;
      secondsAccumulated.current = 0;

      if (connectedRef.current && socketRef.current) {
        socketRef.current.emit(EV.screenHeartbeat, { seconds: toSend });
      } else {
        // Fallback to HTTP
        api("/presence/heartbeat", { method: "POST", body: { seconds: toSend } }).catch(() => {});
      }
    };

    // 1-second interval to accumulate active time
    const interval = setInterval(() => {
      if (typeof document === "undefined") return;
      // Must be visible and focused
      if (document.visibilityState !== "visible") return;
      // Must not be idle for more than 2 minutes
      if (Date.now() - lastInteraction.current > IDLE_TIMEOUT_MS) return;

      secondsAccumulated.current += 1;

      if (secondsAccumulated.current >= FLUSH_INTERVAL_S) {
        flush(1);
      }
    }, 1000);

    // Visibility change listener
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush(1);
      } else {
        lastInteraction.current = Date.now();
      }
    };

    // Page unload listener
    const onPageHide = () => {
      const toSend = secondsAccumulated.current;
      if (toSend >= 1) {
        secondsAccumulated.current = 0;
        try {
          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify({ seconds: toSend })], {
              type: "application/json",
            });
            navigator.sendBeacon(`${SITE.api}/presence/heartbeat`, blob);
          } else {
            flush(1);
          }
        } catch {
          // ignore unload error
        }
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onPageHide);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("click", onInteraction);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onPageHide);
      flush(1);
    };
  }, []);

  return null;
}
