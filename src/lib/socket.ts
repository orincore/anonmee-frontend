import { io, type Socket } from "socket.io-client";
import { SITE } from "./site";

/** The single realtime connection for the signed-in app. Created by SocketProvider only. */
export function createSocket(): Socket {
  return io(SITE.api, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 400,
    reconnectionDelayMax: 4000,
  });
}

export type Ack<T = Record<string, unknown>> = ({ ok: true } & T) | { ok: false; error: string; message: string };

/** Emits an event and waits for the server's answer. If disconnected, waits for connect before emitting. */
export function emitAck<T = Record<string, unknown>>(
  socket: Socket,
  event: string,
  data: unknown = {},
  timeoutMs = 12000,
): Promise<Ack<T>> {
  return new Promise((resolve) => {
    let timer: NodeJS.Timeout | null = null;
    let settled = false;

    const cleanup = () => {
      settled = true;
      if (timer) clearTimeout(timer);
    };

    const doEmit = () => {
      if (settled) return;
      timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve({ ok: false, error: "timeout", message: "No answer from the server. Check your connection." });
      }, timeoutMs);

      socket.emit(event, data, (res: Ack<T>) => {
        if (settled) return;
        cleanup();
        resolve(res);
      });
    };

    if (socket.connected) {
      doEmit();
    } else {
      if (!socket.active) {
        socket.connect();
      }
      const waitTimer = setTimeout(() => {
        if (!settled) doEmit();
      }, 5000);

      socket.once("connect", () => {
        clearTimeout(waitTimer);
        if (!settled) doEmit();
      });
    }
  });
}
