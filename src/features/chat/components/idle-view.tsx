"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export interface IdleViewProps {
  title: string;
  body: string;
  error?: string;
  primaryLabel: string;
  onStart: () => void;
  /** A second, quieter action, such as changing preferences. */
  secondary?: { label: string; onClick: () => void };
}

/** The resting screen, and the "no match yet" screen: one big button and one quiet one. */
export function IdleView({ title, body, error, primaryLabel, onStart, secondary }: IdleViewProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-xl flex-col justify-center gap-6 px-4 py-10 md:min-h-[100dvh]">
      <h1 className="display text-display">{title}</h1>
      <p className="max-w-[44ch] text-lg text-muted">{body}</p>
      {error ? (
        <p role="alert" className="rounded-ui border-2 border-danger px-4 py-3 font-bold text-danger">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
          {primaryLabel}
          <ArrowRight aria-hidden weight="bold" className="size-5" />
        </Button>
        {secondary ? (
          <Button size="lg" variant="secondary" onClick={secondary.onClick} className="w-full sm:w-auto">
            {secondary.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
