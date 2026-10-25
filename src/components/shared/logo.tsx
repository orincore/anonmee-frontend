import Link from "next/link";
import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  href?: string;
  /** Use "inverse" on dark bands so the logo stays readable. */
  tone?: "default" | "inverse";
  imageClassName?: string;
}

/**
 * Brand Logo: renders the official cropped Anonmee logo image exclusively.
 * No duplicate text or wordmark next to it.
 */
export function Logo({ className, href = "/", tone = "default", imageClassName }: LogoProps) {
  const isInverse = tone === "inverse";

  return (
    <Link
      href={href}
      aria-label="Anonmee Dating App Home"
      className={cn(
        "group inline-flex items-center transition-transform active:scale-[0.98]",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center transition-all",
          isInverse
            ? "rounded-xl border-2 border-edge bg-paper px-2 py-1 shadow-sticker-sm"
            : "dark:rounded-xl dark:border-2 dark:border-edge dark:bg-paper dark:px-2 dark:py-1 dark:shadow-sticker-sm"
        )}
      >
        <img
          src="/anonme-logo.png"
          alt="Anonmee"
          className={cn(
            "h-8 w-auto max-w-[170px] object-contain transition-opacity group-hover:opacity-90 sm:h-9 sm:max-w-[190px]",
            imageClassName
          )}
          loading="eager"
        />
      </span>
    </Link>
  );
}
