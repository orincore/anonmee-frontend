import { Chip } from "@/components/ui/chip";
import { GENDER_LABEL } from "@/components/shared";
import { GENDERS } from "@/contracts";

export interface GenderPickerProps {
  value: string | undefined;
  onChange: (gender: (typeof GENDERS)[number]) => void;
  error?: string;
}

/** One choice out of four. Gender is the only personal detail other people ever see, besides age. */
export function GenderPicker({ value, onChange, error }: GenderPickerProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-[15px] font-medium">Gender</legend>
      <div className="flex flex-wrap gap-2">
        {GENDERS.map((g) => (
          <Chip key={g} selected={value === g} onClick={() => onChange(g)}>
            {GENDER_LABEL[g]}
          </Chip>
        ))}
      </div>
      {error ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : (
        <p className="text-sm text-muted">Shown next to your age. Nothing else about you is.</p>
      )}
    </fieldset>
  );
}
