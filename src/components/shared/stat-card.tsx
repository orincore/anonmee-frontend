import { cn } from "@/lib/cn";

export interface StatCardProps {
  label: string;
  value: string | number;
  /** A small line under the number, for example the change since the last period. */
  note?: string;
  tone?: "plain" | "accent" | "pop" | "brand";
}

const TONES = { plain: "bg-surface", accent: "bg-accent text-accent-fg", pop: "bg-pop text-pop-fg", brand: "bg-brand text-brand-fg" } as const;

/** One headline number. Used all over the admin console. */
export function StatCard({ label, value, note, tone = "plain" }: StatCardProps) {
  return (
    <div className={cn("rounded-card border-2 border-edge p-5 shadow-sticker-sm", TONES[tone])}>
      <p className="text-sm font-bold opacity-80">{label}</p>
      <p className="display mt-1 text-4xl">{typeof value === "number" ? value.toLocaleString() : value}</p>
      {note ? <p className="mt-1 text-sm opacity-80">{note}</p> : null}
    </div>
  );
}
