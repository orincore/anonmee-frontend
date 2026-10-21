"use client";

import { useState } from "react";
import { REPORT_REASONS, REPORT_REASON_LABELS, type ReportReason } from "@/contracts";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export interface ReportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The random name of the person being reported, as everyone in the chat sees it. */
  alias: string;
  onSubmit: (reason: ReportReason, details: string) => Promise<void>;
}

function Form({ alias, onSubmit, onDone }: Omit<ReportSheetProps, "open" | "onOpenChange"> & { onDone: () => void }) {
  const [reason, setReason] = useState<ReportReason>();
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="space-y-5">
        <p className="text-lg">Thank you. {alias} has been reported and blocked, so you will not be matched again.</p>
        <Button size="lg" block onClick={onDone}>
          Done
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <fieldset className="space-y-3">
        <legend className="text-[15px] font-bold">What happened?</legend>
        <div className="flex flex-wrap gap-2">
          {REPORT_REASONS.map((r) => (
            <Chip key={r} selected={reason === r} onClick={() => setReason(r)}>
              {REPORT_REASON_LABELS[r]}
            </Chip>
          ))}
        </div>
      </fieldset>
      <div className="space-y-2">
        <label htmlFor="report-details" className="block text-[15px] font-bold">
          Anything to add? (optional)
        </label>
        <textarea id="report-details" value={details} maxLength={400} rows={3} onChange={(e) => setDetails(e.target.value)} className="w-full resize-none rounded-ui border-2 border-line bg-surface p-3 text-base focus:border-edge" />
      </div>
      <p className="text-sm text-muted">They are never told it was you. Reporting also blocks them.</p>
      {error ? (
        <p role="alert" className="text-[15px] font-bold text-danger">
          {error}
        </p>
      ) : null}
      <Button
        size="lg"
        block
        variant="danger"
        disabled={!reason}
        loading={busy}
        onClick={async () => {
          if (!reason) return;
          setBusy(true);
          try {
            await onSubmit(reason, details);
            setSent(true);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Could not send the report. Try again.");
          } finally {
            setBusy(false);
          }
        }}
      >
        Report and block
      </Button>
    </div>
  );
}

export function ReportSheet({ open, onOpenChange, alias, onSubmit }: ReportSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={`Report ${alias}`} description="Tell us what is wrong so we can act.">
        <Form alias={alias} onSubmit={onSubmit} onDone={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
