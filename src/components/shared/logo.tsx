import Link from "next/link";
import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  href?: string;
  /** Use "inverse" on dark bands so the white logo is always shown. */
  tone?: "default" | "inverse";
  imageClassName?: string;
}

/**
 * Brand Logo: renders the transparent official Anonmee logo without background pills or duplicate text.
 * Automatically switches between light logo (/anonme-logo.png) and dark mode white logo (/anonmee-logo-white.png).
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
      {isInverse ? (
        <img
          src="/anonmee-logo-white.png"
          alt="Anonmee"
          className={cn(
            "h-8 w-auto max-w-[170px] object-contain transition-opacity group-hover:opacity-90 sm:h-9 sm:max-w-[190px]",
            imageClassName
          )}
          loading="eager"
        />
      ) : (
        <>
          <img
            src="/anonme-logo.png"
            alt="Anonmee"
            className={cn(
              "logo-light h-8 w-auto max-w-[170px] object-contain transition-opacity group-hover:opacity-90 sm:h-9 sm:max-w-[190px]",
              imageClassName
            )}
            loading="eager"
          />
          <img
            src="/anonmee-logo-white.png"
            alt="Anonmee"
            className={cn(
              "logo-dark h-8 w-auto max-w-[170px] object-contain transition-opacity group-hover:opacity-90 sm:h-9 sm:max-w-[190px]",
              imageClassName
            )}
            loading="eager"
          />
        </>
      )}
    </Link>
  );
}
