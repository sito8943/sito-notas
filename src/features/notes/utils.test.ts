import { describe, expect, it } from "vitest";

import type { Note } from "./models";
import {
  countTagUses,
  findTagByName,
  formatNoteDate,
  getDaysUntilPurge,
  normalizeTagName,
  pickTagColor,
  sortTagsByUses,
} from "./utils";

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

describe("tag helpers", () => {
  const tags = [
    { id: 1, name: "Trabajo", color: "#3B82F6" },
    { id: 2, name: "Ideas", color: "#22C55E" },
  ];

  it("normalizes names", () => {
    expect(normalizeTagName("  Mis   ideas ")).toBe("Mis ideas");
  });

  it("finds a same name ignoring case, accents and the tag itself", () => {
    expect(findTagByName(tags, "trabajó")?.id).toBe(1);
    expect(findTagByName(tags, "Trabajo", 1)).toBeUndefined();
  });

  it("picks the least used palette color", () => {
    expect(pickTagColor(tags)).toBe("#F59E0B");
  });

  it("sorts tags by uses, then by name", () => {
    const uses = new Map([[2, 3]]);
    const extra = { id: 3, name: "Arte" };
    expect(sortTagsByUses([...tags, extra], uses).map((tag) => tag.id)).toEqual(
      [2, 3, 1],
    );
  });

  it("counts how many notes use each tag", () => {
    const note = (ids: number[]) =>
      ({ categories: ids.map((id) => ({ id, name: "" })) }) as unknown as Note;
    expect(countTagUses([note([1, 2]), note([1])]).get(1)).toBe(2);
  });
});
