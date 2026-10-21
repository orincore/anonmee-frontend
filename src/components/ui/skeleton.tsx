import { cn } from "@/lib/cn";

/** Placeholder block. Shape it with classes so it matches the content it stands in for. */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("skeleton rounded-ui bg-line", className)} {...props} />;
}
