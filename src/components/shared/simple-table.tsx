import { cn } from "@/lib/cn";

export interface Column<T> {
  key: string;
  label: string;
  align?: "left" | "right";
  render: (row: T) => React.ReactNode;
}

export interface SimpleTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  empty?: string;
}

/** A plain data table that scrolls sideways on a narrow screen instead of squashing. */
export function SimpleTable<T>({ columns, rows, rowKey, empty = "Nothing yet." }: SimpleTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-card border-2 border-edge bg-surface">
      <table className="w-full min-w-[34rem] text-left text-[15px]">
        <thead>
          <tr className="border-b-2 border-edge">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn("px-4 py-3 font-mono text-xs uppercase tracking-wide text-muted", c.align === "right" && "text-right")}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-muted">{empty}</td></tr>
          ) : (
            rows.map((r) => (
              <tr key={rowKey(r)}>
                {columns.map((c) => <td key={c.key} className={cn("px-4 py-3", c.align === "right" && "text-right font-mono")}>{c.render(r)}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
