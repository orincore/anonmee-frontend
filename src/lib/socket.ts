import { io, type Socket } from "socket.io-client";
import { SITE } from "./site";

/** The single realtime connection for the signed-in app. Created by SocketProvider only. */
export function createSocket(): Socket {
  return io(SITE.api, {
    withCredentials: true,
    transports: ["websocket"],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 400,
    reconnectionDelayMax: 4000,
  });
}

export type Ack<T = Record<string, unknown>> = ({ ok: true } & T) | { ok: false; error: string; message: string };

/** Emits an event and waits for the server's answer, giving up after a few seconds instead of hanging. */
export function emitAck<T = Record<string, unknown>>(socket: Socket, event: string, data: unknown = {}, timeoutMs = 8000): Promise<Ack<T>> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve({ ok: false, error: "timeout", message: "No answer from the server. Check your connection." }), timeoutMs);
    socket.emit(event, data, (res: Ack<T>) => {
      clearTimeout(timer);
      resolve(res);
    });
  });
}
