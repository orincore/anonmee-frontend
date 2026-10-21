import { Flag, Prohibit, SignOut } from "@phosphor-icons/react/dist/ssr";

const ROWS = [
  { icon: Flag, label: "Report", note: "Tell us what happened" },
  { icon: Prohibit, label: "Block", note: "Never matched again" },
  { icon: SignOut, label: "Leave", note: "End the chat" },
] as const;

/** A picture of the real menu that sits in every chat. Decorative, so it is not focusable. */
export function SafetyDemo() {
  return (
    <ul aria-hidden className="divide-y-2 divide-line overflow-hidden rounded-ui border-2 border-edge bg-bg">
      {ROWS.map(({ icon: IconComponent, label, note }) => (
        <li key={label} className="flex min-h-14 items-center gap-4 px-4 py-3">
          <IconComponent weight="bold" className="size-5" />
          <span className="font-bold">{label}</span>
          <span className="ml-auto text-sm text-muted">{note}</span>
        </li>
      ))}
    </ul>
  );
}
