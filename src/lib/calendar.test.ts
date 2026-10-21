import { describe, expect, it } from "vitest";
import { ageOn, compare, daysInMonth, firstColumn, formatLong, isLeapYear, monthNames, parseIso, toIso, weekdayNames } from "./calendar";

describe("calendar maths", () => {
  it("knows leap years, including the century rules", () => {
    expect([2000, 2024, 1996].every(isLeapYear)).toBe(true);
    expect([1900, 2100, 2023, 2001].some(isLeapYear)).toBe(false);
  });

  it("counts days in every month", () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => daysInMonth(2023, m))).toEqual([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(1900, 2)).toBe(28);
  });

  it("finds the Monday-first column of the 1st", () => {
    expect(firstColumn(2024, 1)).toBe(0); // 1 Jan 2024 was a Monday
    expect(firstColumn(2023, 10)).toBe(6); // 1 Oct 2023 was a Sunday
    expect(firstColumn(2000, 2)).toBe(1); // 1 Feb 2000 was a Tuesday
  });

  it("round-trips ISO strings and rejects dates that do not exist", () => {
    expect(toIso({ y: 1999, m: 4, d: 9 })).toBe("1999-04-09");
    expect(parseIso("1999-04-09")).toEqual({ y: 1999, m: 4, d: 9 });
    expect(parseIso("1999-02-29")).toBeNull();
    expect(parseIso("2000-02-29")).toEqual({ y: 2000, m: 2, d: 29 });
    expect(parseIso("1999-13-01")).toBeNull();
    expect(parseIso("not a date")).toBeNull();
    expect(parseIso("")).toBeNull();
    expect(parseIso(undefined)).toBeNull();
  });

  it("works out age the way the server does", () => {
    const today = { y: 2026, m: 10, d: 22 };
    expect(ageOn({ y: 2008, m: 10, d: 22 }, today)).toBe(18); // 18th birthday today
    expect(ageOn({ y: 2008, m: 10, d: 23 }, today)).toBe(17); // one day short
    expect(ageOn({ y: 1999, m: 12, d: 31 }, today)).toBe(26);
  });

  it("orders dates", () => {
    expect(compare({ y: 2000, m: 1, d: 1 }, { y: 2000, m: 1, d: 2 })).toBeLessThan(0);
    expect(compare({ y: 2001, m: 1, d: 1 }, { y: 2000, m: 12, d: 31 })).toBeGreaterThan(0);
  });

  it("names months and weekdays, Monday first", () => {
    expect(monthNames("long", "en")[3]).toBe("April");
    expect(monthNames("short", "en")).toHaveLength(12);
    expect(weekdayNames("en")[0]).toBe("Mon");
    expect(weekdayNames("en")[6]).toBe("Sun");
    expect(formatLong({ y: 1999, m: 4, d: 9 }, "en")).toBe("April 9, 1999");
  });
});
