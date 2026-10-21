import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  title: string;
  body?: string;
  as?: "h1" | "h2";
  className?: string;
}

/** Big condensed title with an optional paragraph, stacked and left aligned. */
export function SectionHeading({ title, body, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      <Tag className="display text-display">{title}</Tag>
      {body ? <p className="max-w-[56ch] text-lg text-muted md:text-xl">{body}</p> : null}
    </div>
  );
}
