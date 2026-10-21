import { cn } from "@/lib/cn";

const SIZES = { sm: "size-9 text-sm", md: "size-11 text-base", lg: "size-16 text-2xl" } as const;
const COLOURS = ["bg-accent text-accent-fg", "bg-pop text-pop-fg", "bg-brand text-brand-fg"] as const;

/** A rounded sticker with initials from the random alias. The colour comes from the name, so it is stable. There are no photos on Anonmee. */
export function AliasAvatar({ alias, size = "md", className }: { alias: string; size?: keyof typeof SIZES; className?: string }) {
  const initials = alias
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const colour = COLOURS[[...alias].reduce((n, c) => n + c.charCodeAt(0), 0) % COLOURS.length];
  return (
    <span aria-hidden className={cn("display grid shrink-0 -rotate-3 place-items-center rounded-xl border-2 border-edge", colour, SIZES[size], className)}>
      {initials}
    </span>
  );
}
