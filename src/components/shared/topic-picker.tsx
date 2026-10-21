import { Chip } from "@/components/ui/chip";
import { TOPICS } from "@/lib/topics";

export interface TopicPickerProps {
  value: string[];
  onChange: (next: string[]) => void;
}

/** Topics you like. Pick any number. Groups and chats about these show up first. */
export function TopicPicker({ value, onChange }: TopicPickerProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Topics I like">
      {TOPICS.map((t) => (
        <Chip key={t.slug} selected={value.includes(t.slug)} onClick={() => onChange(value.includes(t.slug) ? value.filter((x) => x !== t.slug) : [...value, t.slug])}>
          {t.label}
        </Chip>
      ))}
    </div>
  );
}
