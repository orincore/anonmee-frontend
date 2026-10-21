import { cn } from "@/lib/cn";

export interface PageShellProps {
  title?: string;
  /** One line under the title. */
  subtitle?: string;
  /** Wide screens only: how wide the content may grow. */
  width?: "narrow" | "wide";
  children: React.ReactNode;
  className?: string;
}

/** Page content wrapper for app screens. Leaves room for the phone tab bar and the home indicator. */
export function PageShell({ title, subtitle, width = "narrow", children, className }: PageShellProps) {
  return (
    <div className={cn("mx-auto w-full px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 md:px-8 md:pb-10 md:pt-10", width === "narrow" ? "max-w-2xl" : "max-w-5xl", className)}>
      {title ? (
        <header className="mb-6 space-y-1">
          <h1 className="display text-4xl">{title}</h1>
          {subtitle ? <p className="text-base text-muted">{subtitle}</p> : null}
        </header>
      ) : null}
      {children}
    </div>
  );
}
