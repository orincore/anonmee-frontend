import { cn } from "@/lib/cn";

/** A phone bezel to show the product in. Purely a frame: the screen is whatever you pass in. */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-[17.5rem] rounded-[2.75rem] border-[3px] border-ink bg-ink p-2.5 shadow-[8px_8px_0_0_var(--ink)] sm:w-[19rem]", className)}>
      <div className="overflow-hidden rounded-[2.2rem] bg-bg text-fg">
        <div aria-hidden className="mx-auto mt-2.5 h-5 w-20 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}
