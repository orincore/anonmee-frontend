"use client";

import { PaperPlaneRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MessageBubble, PeerBadge, TypingDots } from "@/components/shared";
import type { PeerView } from "@/contracts";

const THEM: PeerView = { alias: "Midnight Fox 31", gender: "male", age: 27 };
const LINES = [
  { own: false, text: "Okay, be honest. Best late night snack?" },
  { own: true, text: "Cold pizza. No debate." },
  { own: false, text: "Respect. Did not expect that." },
  { own: true, text: "Your turn. What are you up late for?" },
] as const;

const TYPING_MS = 1100;
const GAP_MS = 700;

/**
 * An example conversation that plays once the way a real one feels: a pause, a typing indicator, a message.
 * Built from the same components as the real chat. Under reduced motion it simply shows all of it.
 */
export function Transcript() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce || shown >= LINES.length) return;
    const theirs = !LINES[shown].own;
    const startTyping = setTimeout(() => theirs && setTyping(true), GAP_MS);
    const reveal = setTimeout(() => {
      setTyping(false);
      setShown((n) => n + 1);
    }, GAP_MS + (theirs ? TYPING_MS : 500));
    return () => {
      clearTimeout(startTyping);
      clearTimeout(reveal);
    };
  }, [shown, reduce]);

  const visible = reduce ? LINES : LINES.slice(0, shown);
  return (
    <figure>
      <div className="border-b-2 border-edge px-4 py-3">
        <PeerBadge peer={THEM} />
      </div>
      <ul className="h-[19rem] space-y-3 overflow-hidden px-4 py-4" aria-label="Example conversation">
        <AnimatePresence initial={false}>
          {visible.map((l) => (
            <motion.li key={l.text} initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
              <MessageBubble text={l.text} own={l.own} className="max-w-[88%] text-[15px]" />
            </motion.li>
          ))}
          {typing ? (
            <motion.li key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TypingDots label="Midnight Fox is typing" />
            </motion.li>
          ) : null}
        </AnimatePresence>
      </ul>
      <div aria-hidden className="flex items-center gap-2 border-t-2 border-edge p-3">
        <span className="flex-1 rounded-full border-2 border-line px-4 py-2.5 text-[15px] text-muted">Say something</span>
        <span className="grid size-10 place-items-center rounded-full border-2 border-edge bg-accent text-accent-fg">
          <PaperPlaneRight weight="fill" className="size-5" />
        </span>
      </div>
      <figcaption className="sr-only">Example chat. Names change every time.</figcaption>
    </figure>
  );
}
