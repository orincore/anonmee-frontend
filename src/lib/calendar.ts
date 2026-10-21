/**
 * Plain calendar maths for the date picker. Everything works in whole years, months (1 to 12) and days,
 * and dates travel as "YYYY-MM-DD" strings, so there are no time zones to get wrong.
 */
export interface YMD {
  y: number;
  m: number;
  d: number;
}

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

export const toIso = ({ y, m, d }: YMD): string => `${pad(y, 4)}-${pad(m)}-${pad(d)}`;

/** Reads "YYYY-MM-DD". Returns null for anything that is not a real calendar date (so 31 February is rejected). */
export function parseIso(s: string | undefined): YMD | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? "");
  if (!m) return null;
  const v = { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
  return v.m >= 1 && v.m <= 12 && v.d >= 1 && v.d <= daysInMonth(v.y, v.m) ? v : null;
}

export const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

export function daysInMonth(y: number, m: number): number {
  return [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]!;
}

/** Which column the 1st falls in when weeks start on Monday: 0 is Monday, 6 is Sunday. */
export function firstColumn(y: number, m: number): number {
  const sunday0 = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  return (sunday0 + 6) % 7;
}

export const compare = (a: YMD, b: YMD) => a.y - b.y || a.m - b.m || a.d - b.d;

/** Whole years between a birth date and a day (default today). Same rule the server uses. */
export function ageOn(birth: YMD, today: YMD): number {
  return today.y - birth.y - (today.m < birth.m || (today.m === birth.m && today.d < birth.d) ? 1 : 0);
}

export const todayUtc = (now = new Date()): YMD => ({ y: now.getUTCFullYear(), m: now.getUTCMonth() + 1, d: now.getUTCDate() });

/** Month names in the viewer's language. */
export function monthNames(style: "long" | "short", locale?: string): string[] {
  const f = new Intl.DateTimeFormat(locale, { month: style, timeZone: "UTC" });
  return Array.from({ length: 12 }, (_, i) => f.format(new Date(Date.UTC(2021, i, 15))));
}

/** Monday-first short weekday names in the viewer's language. */
export function weekdayNames(locale?: string): string[] {
  const f = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, i) => f.format(new Date(Date.UTC(2021, 0, 4 + i)))); // 4 Jan 2021 was a Monday
}

export const formatLong = ({ y, m, d }: YMD, locale?: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
