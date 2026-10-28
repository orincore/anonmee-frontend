/** "21 Oct 2026, 10:42" in the viewer's own time zone. */
export function formatDateTime(ms: number): string {
  return new Date(ms).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

/** "3 minutes ago", "2 days ago". */
export function timeAgo(ms: number): string {
  const s = Math.round((Date.now() - ms) / 1000);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (s < 60) return rtf.format(-s, "second");
  if (s < 3600) return rtf.format(-Math.round(s / 60), "minute");
  if (s < 86400) return rtf.format(-Math.round(s / 3600), "hour");
  return rtf.format(-Math.round(s / 86400), "day");
}

/** "9+" past nine: a badge only has to say "there is more", and the AI only keeps about ten unread waiting. */
export const formatUnread = (n: number): string => (n > 9 ? "9+" : String(n));
