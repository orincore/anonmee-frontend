export interface BarSeriesProps {
  /** One entry per day (or any step), oldest first. */
  data: { label: string; value: number }[];
  /** A short description for screen readers, since the bars are a picture. */
  summary: string;
}

/** A small bar chart made of plain boxes: no chart library, and it is crisp at any size. */
export function BarSeries({ data, summary }: BarSeriesProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <figure>
      <div role="img" aria-label={summary} className="flex h-32 items-end gap-1">
        {data.map((d) => (
          <div key={d.label} className="group relative flex h-full flex-1 items-end" title={`${d.label}: ${d.value}`}>
            <span className="w-full rounded-t-md border-2 border-edge bg-accent" style={{ height: `${Math.max(4, (d.value / max) * 100)}%` }} />
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex justify-between font-mono text-xs text-muted">
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </figcaption>
    </figure>
  );
}
