import { Logo, ThemeToggle } from "@/components/shared";

export interface AuthFrameProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

/** Sign-up and log-in layout: a cobalt panel with the brand on one side, the form on the other. On phones the panel is a slim header. */
export function AuthFrame({ title, subtitle, children }: AuthFrameProps) {
  return (
    <div className="min-h-[100dvh] md:grid md:grid-cols-[0.85fr_1.15fr]">
      <aside className="flex items-center justify-between bg-brand px-4 py-3 text-brand-fg md:flex-col md:items-start md:justify-between md:px-10 md:py-10">
        <Logo tone="inverse" />
        <div className="hidden space-y-6 md:block">
          <p className="display text-hero">
            Say it.
            <br />
            Stay{" "}
            <span className="inline-block -rotate-1 rounded-2xl border-2 border-ink bg-accent px-3 pb-1 text-accent-fg shadow-[4px_4px_0_0_var(--ink)]">you</span>
            .
          </p>
          <p className="max-w-xs text-lg">Nobody ever sees your email or username. Only your gender and age.</p>
        </div>
        <ThemeToggle />
      </aside>
      <main className="mx-auto flex w-full max-w-md flex-col justify-center gap-8 px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 md:max-w-lg md:px-10 md:py-12">
        <div className="space-y-2">
          <h1 className="display text-display">{title}</h1>
          <p className="text-base text-muted">{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
