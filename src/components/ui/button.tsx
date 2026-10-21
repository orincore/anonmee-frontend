import { Slot } from "@radix-ui/react-slot";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/*
 * Chunky sticker buttons: pill shape, outline, solid offset shadow that squashes when pressed.
 * Always at least 44px tall. Primary actions use md (48px) or lg (56px).
 * Built on the Spectrum UI loading button: same loading prop and asChild support, our tokens.
 */
/** The sticker look: outline plus a solid shadow that grows on hover and squashes when pressed. */
const STICKER =
  "border-edge shadow-sticker hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--edge)] active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0";

export const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 font-bold transition-[transform,box-shadow,background-color] duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-line disabled:bg-elevated disabled:text-muted disabled:shadow-none aria-busy:pointer-events-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary: `${STICKER} bg-accent text-accent-fg`,
        brand: `${STICKER} bg-brand text-brand-fg`,
        pop: `${STICKER} bg-pop text-pop-fg`,
        secondary: `${STICKER} bg-surface text-fg`,
        danger: `${STICKER} bg-danger text-bg`,
        ghost: "border-transparent text-fg hover:bg-line",
      },
      size: {
        sm: "min-h-11 px-5 text-[15px]",
        md: "min-h-12 px-7 text-base",
        lg: "min-h-14 px-9 text-lg",
        icon: "size-11",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({ className, variant, size, block, asChild, loading, children, disabled, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, block }), className)}
      // Loading is not "disabled": the button keeps its colour and shows a spinner, but ignores taps and Enter.
      disabled={disabled}
      aria-busy={loading || undefined}
      {...props}
      onClick={asChild ? props.onClick : (e) => (loading ? e.preventDefault() : props.onClick?.(e))}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <CircleNotch aria-hidden weight="bold" className="size-5 animate-spin motion-reduce:animate-none" /> : null}
          {children}
        </>
      )}
    </Comp>
  );
}
