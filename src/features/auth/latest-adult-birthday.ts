import { MIN_AGE } from "@/contracts";

/** The newest date of birth that is still 18 or older, as YYYY-MM-DD. Lets the date picker block minors up front. */
export function latestAdultBirthday(now: Date = new Date()): string {
  const d = new Date(Date.UTC(now.getUTCFullYear() - MIN_AGE, now.getUTCMonth(), now.getUTCDate()));
  return d.toISOString().slice(0, 10);
}
