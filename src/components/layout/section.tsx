import { cn } from "@/lib/cn";

export interface SectionProps extends React.ComponentProps<"section"> {
  /** Narrow keeps long copy readable; wide fits grids. */
  width?: "narrow" | "wide";
}

/** Marketing page band: consistent width, side gutters and generous vertical space. */
export function Section({ width = "wide", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("mx-auto w-full px-4 py-20 md:px-6 md:py-28", width === "narrow" ? "max-w-3xl" : "max-w-6xl", className)} {...props}>
      {children}
    </section>
  );
}
