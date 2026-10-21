import { RedactionBar } from "@/components/shared";

const SHOWN = [
  ["Seen as", "Quiet Otter 47"],
  ["Gender", "Female"],
  ["Age", "24"],
] as const;
const HIDDEN = [
  ["Email", "w-44"],
  ["Username", "w-32"],
  ["Name", "w-40"],
  ["Date of birth", "w-28"],
] as const;

/** The whole privacy promise as a form: what appears, and what is blacked out. */
export function IdSlip() {
  return (
    <div className="relative rotate-2 rounded-card border-2 border-ink bg-paper text-ink shadow-[8px_8px_0_0_var(--ink)]">
      <p className="border-b-2 border-ink px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-wide">What others see about you</p>
      <dl className="divide-y divide-ink/15 px-5">
        {SHOWN.map(([k, v]) => (
          <div key={k} className="flex min-h-14 items-center justify-between gap-4">
            <dt className="text-ink/65">{k}</dt>
            <dd className="text-lg font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="border-y-2 border-ink px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-wide">Never shown</p>
      <dl className="divide-y divide-ink/15 px-5 pb-1">
        {HIDDEN.map(([k, w]) => (
          <div key={k} className="flex min-h-14 items-center justify-between gap-4">
            <dt className="text-ink/65">{k}</dt>
            <dd>
              <RedactionBar className={w} />
            </dd>
          </div>
        ))}
      </dl>
      <span aria-hidden className="display absolute -right-3 -top-5 rotate-12 rounded-lg border-2 border-ink bg-accent px-3 py-1 text-xl text-accent-fg shadow-[3px_3px_0_0_var(--ink)]">
        private
      </span>
    </div>
  );
}
