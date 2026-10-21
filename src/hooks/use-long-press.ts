"use client";

import { useCallback, useRef } from "react";

export interface PressPoint {
  x: number;
  y: number;
  /** "mouse" opens a menu at the cursor; "touch" and "key" open the bottom sheet. */
  source: "mouse" | "touch" | "key";
}

const HOLD_MS = 420;
const SLOP_PX = 10;

/**
 * Opens a menu the way people expect on each device: right-click on a computer, press and hold on a phone,
 * and the Menu key (or Shift+F10) from the keyboard. Moving your finger while holding cancels it, so scrolling still works.
 */
export function useLongPress(onOpen: (p: PressPoint) => void) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const start = useRef({ x: 0, y: 0 });
  const touch = useRef(false);
  // Set once our own hold timer has opened the menu, so the browser's follow-up contextmenu event does not open it twice.
  const opened = useRef(false);

  const cancel = useCallback(() => clearTimeout(timer.current), []);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      touch.current = e.pointerType !== "mouse";
      if (!touch.current) return;
      opened.current = false;
      start.current = { x: e.clientX, y: e.clientY };
      cancel();
      timer.current = setTimeout(() => {
        opened.current = true;
        navigator.vibrate?.(10);
        onOpen({ ...start.current, source: "touch" });
      }, HOLD_MS);
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > SLOP_PX) cancel();
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault(); // never the browser's own menu; ours opens instead
      if (touch.current) {
        if (!opened.current) onOpen({ x: e.clientX, y: e.clientY, source: "touch" });
        return;
      }
      onOpen({ x: e.clientX, y: e.clientY, source: "mouse" });
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10")) {
        e.preventDefault();
        const r = e.currentTarget.getBoundingClientRect();
        onOpen({ x: r.left + r.width / 2, y: r.bottom, source: "key" });
      }
    },
  };
}
