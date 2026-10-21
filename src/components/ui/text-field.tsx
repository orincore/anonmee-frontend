import { useId } from "react";
import { cn } from "@/lib/cn";

export interface TextFieldProps extends Omit<React.ComponentProps<"input">, "id"> {
  label: string;
  hint?: string;
  error?: string;
  /** Right-aligned element inside the field, for example a show/hide button. */
  trailing?: React.ReactNode;
}

/**
 * Label above, hint under it, error below. Never a placeholder-as-label.
 * 16px text so iOS Safari does not zoom in on focus.
 */
export function TextField({ label, hint, error, trailing, className, ...props }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[15px] font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hint && hintId, error && errorId) || undefined}
          className={cn(
            "min-h-12 w-full rounded-ui border-2 bg-surface px-4 text-base text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] focus:shadow-sticker-sm",
            error ? "border-danger" : "border-line hover:border-edge focus:border-edge",
            trailing && "pr-14",
            className,
          )}
          {...props}
        />
        {trailing ? <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div> : null}
      </div>
      {hint && !error ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
