import Link from "next/link";
import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  href?: string;
  /** Use "inverse" on dark bands so the text stays readable. */
  tone?: "default" | "inverse";
  /** Optional icon-only mode if needed */
  iconOnly?: boolean;
}

/** Brand Logo: incorporates the official Anonmee app icon with the neo-brutalist sticker wordmark. */
export function Logo({ className, href = "/", tone = "default", iconOnly = false }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Anonmee Dating App Home"
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 transition-transform active:scale-[0.98]",
        className
      )}
    >
      <div className="relative size-8 shrink-0 overflow-hidden rounded-xl border-2 border-edge bg-surface shadow-sticker-sm transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105 sm:size-9">
        <img
          src="/anonme-logo.png"
          alt="Anonmee Dating App Logo"
          className="size-full object-cover"
          loading="eager"
        />
      </div>

      {!iconOnly ? (
        <span
          className={cn(
            "display text-[1.75rem] leading-none tracking-tight",
            tone === "inverse" ? "text-paper" : "text-fg"
          )}
        >
          anon
          <span className="ml-1 inline-block -rotate-3 rounded-lg border-2 border-ink bg-accent px-1.5 pb-0.5 pt-1 text-ink shadow-[2px_2px_0_0_var(--ink)]">
            mee
          </span>
        </span>
      ) : null}
    </Link>
  );
}
