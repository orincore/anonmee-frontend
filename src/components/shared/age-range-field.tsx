import { MIN_AGE } from "@/contracts";
import { TextField } from "@/components/ui/text-field";

export interface AgeRangeFieldProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  error?: string;
}

/** The youngest and oldest age you would like to meet. Nobody under 18 exists on Anonmee, so 18 is the floor. */
export function AgeRangeField({ min, max, onChange, error }: AgeRangeFieldProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Youngest" type="number" inputMode="numeric" min={MIN_AGE} max={99} value={min} onChange={(e) => onChange(Number(e.target.value), max)} />
        <TextField label="Oldest" type="number" inputMode="numeric" min={MIN_AGE} max={99} value={max} onChange={(e) => onChange(min, Number(e.target.value))} />
      </div>
      {error ? <p role="alert" className="text-sm font-bold text-danger">{error}</p> : null}
    </div>
  );
}
