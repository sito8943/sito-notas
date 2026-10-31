import { describe, expect, it } from "vitest";

import { formatNoteDate, getDaysUntilPurge } from "./utils";

const NOW = Date.UTC(2026, 9, 30, 12, 0, 0);
const HOUR = 60 * 60 * 1000;

describe("formatNoteDate", () => {
  it("shows recent dates relative to now", () => {
    expect(formatNoteDate(NOW - 30 * 1000, "en", NOW)).toBe("now");
    expect(formatNoteDate(NOW - 5 * 60 * 1000, "en", NOW)).toBe(
      "5 minutes ago",
    );
    expect(formatNoteDate(NOW - 3 * HOUR, "en", NOW)).toBe("3 hours ago");
    expect(formatNoteDate(NOW - 24 * HOUR, "en", NOW)).toBe("yesterday");
    expect(formatNoteDate(NOW - 2 * 24 * HOUR, "es", NOW)).toBe("anteayer");
  });

  it("shows the date for notes older than a week", () => {
    expect(formatNoteDate(Date.UTC(2022, 1, 10, 12), "en", NOW)).toBe(
      "Feb 10, 2022",
    );
  });

  it("treats future dates (clock skew) as now", () => {
    expect(formatNoteDate(NOW + HOUR, "en", NOW)).toBe("now");
  });
});

describe("getDaysUntilPurge", () => {
  const DAY = 24 * HOUR;

  it("counts down the 30 days of the trash", () => {
    expect(getDaysUntilPurge(NOW, NOW)).toBe(30);
    expect(getDaysUntilPurge(NOW - DAY - HOUR, NOW)).toBe(29);
    expect(getDaysUntilPurge(NOW - 29 * DAY, NOW)).toBe(1);
  });

  it("never goes below zero", () => {
    expect(getDaysUntilPurge(NOW - 45 * DAY, NOW)).toBe(0);
  });
});
