"use client";

import { Check, EyeSlash, Prohibit } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

type MV = ReturnType<typeof useMotionValue<number>>;
const STICKERS = [
  { label: "18+ only", icon: Prohibit, tone: "bg-pop text-pop-fg", pos: "-left-2 -top-5", tilt: "-rotate-6", depth: 14 },
  { label: "Matched!", icon: Check, tone: "bg-accent text-accent-fg", pos: "-right-1 -top-4", tilt: "rotate-6", depth: 20 },
  { label: "No names", icon: EyeSlash, tone: "bg-surface text-fg", pos: "-bottom-5 left-8", tilt: "rotate-3", depth: 16 },
] as const;

function Sticker({ s, mx, my, still }: { s: (typeof STICKERS)[number]; mx: MV; my: MV; still: boolean }) {
  // Stickers at different depths drift by different amounts, so the scene feels layered.
  const x = useSpring(useTransform(mx, (v) => v * s.depth), { stiffness: 120, damping: 16, mass: 0.4 });
  const y = useSpring(useTransform(my, (v) => v * s.depth), { stiffness: 120, damping: 16, mass: 0.4 });
  const Icon = s.icon;
  return (
    <motion.div style={still ? undefined : { x, y }} className={cn("absolute z-10", s.pos)}>
      <motion.span
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.4 }}
        className={cn("display flex items-center gap-1.5 rounded-full border-2 border-edge px-3.5 py-1.5 text-base shadow-sticker", s.tone, s.tilt)}
      >
        <Icon aria-hidden weight="bold" className="size-5" />
        {s.label}
      </motion.span>
    </motion.div>
  );
}

/** Wraps the phone and floats a few stickers around it that follow the pointer. Under reduced motion they sit still. */
export function FloatingStickers({ children }: { children: React.ReactNode }) {
  const still = useReducedMotion() ?? false;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  return (
    <div
      className="relative mx-auto w-fit"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
      {STICKERS.map((s) => (
        <Sticker key={s.label} s={s} mx={mx} my={my} still={still} />
      ))}
    </div>
  );
}
