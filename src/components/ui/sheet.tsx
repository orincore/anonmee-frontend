"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/*
 * Bottom sheet on phones, centred dialog from 768px up. Adapted from the Spectrum UI responsive modal.
 * Radix handles focus trapping, Escape, and scroll locking, so it is keyboard and screen reader safe.
 */
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export interface SheetContentProps extends Omit<React.ComponentProps<typeof Dialog.Content>, "title"> {
  title: string;
  description?: string;
}

export function SheetContent({ title, description, className, children, ...props }: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="sheet-overlay fixed inset-0 z-40 bg-fg/50" />
      <Dialog.Content
        className={cn(
          "sheet-content fixed z-50 flex max-h-[92dvh] flex-col gap-5 overflow-y-auto border-2 border-edge bg-surface p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
          "inset-x-0 bottom-0 rounded-t-card shadow-sticker",
          "md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-card md:pb-6",
          className,
        )}
        {...props}
      >
        <div aria-hidden className="mx-auto -mt-2 h-1.5 w-10 rounded-full bg-line md:hidden" />
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Dialog.Title className="display text-2xl">{title}</Dialog.Title>
            {description ? <Dialog.Description className="text-[15px] text-muted">{description}</Dialog.Description> : null}
          </div>
          <Dialog.Close aria-label="Close" className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-fg hover:bg-line">
            <X aria-hidden weight="bold" className="size-5" />
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
