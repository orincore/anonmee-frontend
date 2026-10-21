import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export interface ChipProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  selected: boolean;
}

/** A tag you switch on and off. Off: outlined. On: peach with a sticker shadow. At least 44px tall. */
export function Chip({ selected, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-5 text-[15px] font-bold transition-[transform,box-shadow,background-color] duration-150 active:translate-x-0.5 active:translate-y-0.5 motion-reduce:transition-none",
        selected ? "border-edge bg-accent text-accent-fg shadow-sticker-sm" : "border-line bg-surface text-fg hover:border-edge",
        className,
      )}
      {...props}
    >
      {selected ? <Check aria-hidden weight="bold" className="size-4" /> : null}
      {children}
    </button>
  );
}
