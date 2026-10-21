import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon: Icon;
  title: string;
  body: string;
  /** The single next step, usually a Button. */
  action?: React.ReactNode;
  className?: string;
}

/** Shown when a list has nothing yet. Always says what to do next. */
export function EmptyState({ icon: IconComponent, title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-start gap-4 rounded-card border-2 border-edge bg-surface p-6 shadow-sticker md:p-8", className)}>
      <span className="grid size-14 -rotate-3 place-items-center rounded-xl border-2 border-edge bg-pop text-pop-fg">
        <IconComponent aria-hidden weight="bold" className="size-7" />
      </span>
      <div className="space-y-1.5">
        <h3 className="display text-2xl">{title}</h3>
        <p className="max-w-sm text-[15px] text-muted">{body}</p>
      </div>
      {action}
    </div>
  );
}
