import { GENDERS, type Gender } from "@/contracts";
import { Chip } from "@/components/ui/chip";
import { GENDER_LABEL } from "./peer-badge";

export interface GenderWantPickerProps {
  value: Gender[];
  onChange: (next: Gender[]) => void;
}

/** Who would you like to meet? Pick any mix, or tap Anyone. */
export function GenderWantPicker({ value, onChange }: GenderWantPickerProps) {
  const everyone = GENDERS.every((g) => value.includes(g));
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Who I want to meet">
      <Chip selected={everyone} onClick={() => onChange(everyone ? [] : [...GENDERS])}>
        Anyone
      </Chip>
      {GENDERS.map((g) => (
        <Chip key={g} selected={value.includes(g)} onClick={() => onChange(value.includes(g) ? value.filter((x) => x !== g) : [...value, g])}>
          {GENDER_LABEL[g]}
        </Chip>
      ))}
    </div>
  );
}
