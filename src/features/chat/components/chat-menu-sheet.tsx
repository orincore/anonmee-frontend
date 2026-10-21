"use client";

import { Flag, Prohibit, SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";

export interface ChatMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The other person's random name. */
  alias: string;
  onReport: () => void;
  onBlock: () => Promise<void>;
  /** Leave the chat. Leave this out to hide the row, for example when reporting a person inside a group. */
  onLeave?: () => void;
  description?: string;
  /** Show only the Leave row, for menus about the group itself rather than a person. */
  hideSafety?: boolean;
}

function Row({ icon: IconComponent, label, note, danger, onClick }: { icon: typeof Flag; label: string; note: string; danger?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex min-h-16 w-full items-center gap-4 rounded-ui border-2 border-edge bg-bg px-4 py-3 text-left transition-colors hover:bg-line", danger && "text-danger")}>
      <IconComponent aria-hidden weight="bold" className="size-6 shrink-0" />
      <span>
        <span className="block font-bold">{label}</span>
        <span className="block text-sm text-muted">{note}</span>
      </span>
    </button>
  );
}

/** The three safety actions, always one tap from any chat. Block asks once before it does anything. */
export function ChatMenuSheet({ open, onOpenChange, alias, onReport, onBlock, onLeave, description = "You are always in control.", hideSafety }: ChatMenuSheetProps) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string>();
  return (
    <Sheet open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setConfirming(false); }}>
      <SheetContent title={alias} description={description}>
        <div className="space-y-3">
          {hideSafety ? null : <Row icon={Flag} label="Report" note="Tell us what happened. Also blocks them." onClick={() => { onOpenChange(false); onReport(); }} />}
          {hideSafety ? null : confirming ? (
            <div className="space-y-3 rounded-ui border-2 border-danger p-4">
              <p className="font-bold">Block {alias}? You will never be matched again.</p>
              <div className="flex gap-3">
                <button type="button" onClick={async () => { try { await onBlock(); onOpenChange(false); } catch (e) { setError(e instanceof Error ? e.message : "Could not block. Try again."); } }} className="min-h-11 flex-1 rounded-full border-2 border-edge bg-danger font-bold text-bg">Block</button>
                <button type="button" onClick={() => setConfirming(false)} className="min-h-11 flex-1 rounded-full border-2 border-edge bg-surface font-bold">Cancel</button>
              </div>
              {error ? <p role="alert" className="text-sm font-bold text-danger">{error}</p> : null}
            </div>
          ) : (
            <Row icon={Prohibit} label="Block" note="Never be matched with them again." onClick={() => setConfirming(true)} />
          )}
          {onLeave ? <Row icon={SignOut} label="Leave chat" note="End the conversation." danger onClick={() => { onOpenChange(false); onLeave(); }} /> : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
