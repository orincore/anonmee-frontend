import { Chip } from "@/components/ui/chip";

const OPTIONS = [7, 30, 90];

/** Pick how far back to look. */
export function DaysPicker({ value, onChange }: { value: number; onChange: (days: number) => void }) {
  return (
    <div className="flex gap-2" role="group" aria-label="Time range">
      {OPTIONS.map((d) => (
        <Chip key={d} selected={value === d} onClick={() => onChange(d)}>Last {d} days</Chip>
      ))}
    </div>
  );
}
