import { cn } from "@/lib/cn";

export interface StepCardProps {
  /** The part of the title that gets the colour highlight. */
  highlight: string;
  rest?: string;
  tone: "accent" | "pop" | "brand";
  body: string;
  children: React.ReactNode;
  className?: string;
}

const TONES = {
  accent: "bg-accent text-accent-fg",
  pop: "bg-pop text-pop-fg",
  brand: "bg-brand text-brand-fg",
} as const;

/** A sticker card for one step. The title carries the colour, and the live demo sits straight on the card. */
export function StepCard({ highlight, rest, tone, body, children, className }: StepCardProps) {
  return (
    <li className={cn("flex flex-col gap-6 rounded-card border-2 border-edge bg-surface p-6 shadow-sticker md:p-8", className)}>
      <div className="space-y-3">
        <h3 className="display text-4xl md:text-5xl">
          <span className={cn("inline-block -rotate-1 rounded-xl border-2 border-edge px-2.5 pb-0.5", TONES[tone])}>{highlight}</span>
          {rest ? <> {rest}</> : null}
        </h3>
        <p className="max-w-[44ch] text-lg text-muted">{body}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </li>
  );
}
