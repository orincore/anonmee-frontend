import { useId } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export interface CheckboxFieldProps extends Omit<React.ComponentProps<"input">, "id" | "type"> {
  label: React.ReactNode;
  error?: string;
}

/** A checkbox with a large tap area: the whole row toggles it. */
export function CheckboxField({ label, error, className, ...props }: CheckboxFieldProps) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className={cn("flex min-h-11 cursor-pointer items-start gap-3 py-1.5", className)}>
        <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
          <input id={id} type="checkbox" aria-invalid={error ? true : undefined} className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-md border-2 border-edge bg-surface checked:bg-accent" {...props} />
          <Check aria-hidden weight="bold" className="pointer-events-none relative size-4 text-accent-fg opacity-0 peer-checked:opacity-100" />
        </span>
        <span className="text-[15px] leading-snug">{label}</span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
