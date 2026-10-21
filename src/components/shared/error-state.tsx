"use client";

import { WarningCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/** Shown when loading failed. Always offers a way to try again. */
export function ErrorState({ message = "Something went wrong.", onRetry, className }: ErrorStateProps) {
  return (
    <div role="alert" className={cn("flex flex-col items-start gap-4 rounded-card border-2 border-danger bg-surface p-6 md:p-8", className)}>
      <WarningCircle aria-hidden weight="bold" className="size-8 text-danger" />
      <p className="max-w-sm text-base font-medium">{message}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
