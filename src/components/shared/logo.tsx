import Link from "next/link";
import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  href?: string;
  /** Use "inverse" on dark bands so the first half stays readable. */
  tone?: "default" | "inverse";
}

/** Wordmark: "me" is a tilted peach sticker. No icon, no mascot. */
export function Logo({ className, href = "/", tone = "default" }: LogoProps) {
  return (
    <Link href={href} aria-label="Anonmee home" className={cn("display inline-flex min-h-11 items-center text-[1.75rem] leading-none", tone === "inverse" ? "text-paper" : "text-fg", className)}>
anon
      <span className="ml-1 -rotate-3 rounded-lg border-2 border-ink bg-accent px-1.5 pb-0.5 pt-1 text-ink shadow-[2px_2px_0_0_var(--ink)]">mee</span>
    </Link>
  );
}
