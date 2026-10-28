"use client";

import { useRef } from "react";

export interface OtpFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

/** Row of single-digit boxes. Typing advances, backspace goes back, and pasting a whole code fills every box. */
export function OtpField({ label, value, onChange, length = 6, disabled, autoFocus }: OtpFieldProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const set = (index: number, digit: string) => {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));
  };

  return (
    <div className="space-y-2" role="group" aria-label={label}>
      <span className="block text-center text-sm font-semibold text-fg">{label}</span>
      <div
        className="flex justify-center gap-2 sm:gap-3"
        onPaste={(e) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
          if (!pasted) return;
          onChange(pasted);
          refs.current[Math.min(pasted.length, length - 1)]?.focus();
        }}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => {
              const clean = e.target.value.replace(/\D/g, "");
              set(i, clean.slice(-1));
              if (clean && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
              else if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
              else if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
            }}
            className="size-12 rounded-ui border-2 border-line bg-surface text-center font-mono text-2xl font-bold text-fg transition-[border-color,box-shadow] hover:border-edge focus:border-edge focus:shadow-sticker-sm disabled:opacity-50 sm:size-14 sm:text-3xl"
          />
        ))}
      </div>
    </div>
  );
}
