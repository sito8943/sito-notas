import { describe, expect, it } from "vitest";

import type { Note } from "@/features/notes/models";

import { applyOrder, mergeVisibleOrder, moveId } from "./utils";

describe("moveId", () => {
  it("moves an item down to the target place", () => {
    expect(moveId([1, 2, 3, 4], 1, 3)).toEqual([2, 3, 1, 4]);
  });

  it("moves an item up to the target place", () => {
    expect(moveId([1, 2, 3, 4], 4, 2)).toEqual([1, 4, 2, 3]);
  });

  it("keeps the order for unknown or same ids", () => {
    const ids = [1, 2];
    expect(moveId(ids, 1, 1)).toBe(ids);
    expect(moveId(ids, 1, 9)).toBe(ids);
  });
});

describe("mergeVisibleOrder", () => {
  it("keeps hidden notes in their slots", () => {
    // 2 and 4 hidden by a filter; visible 1,3,5 reordered to 5,1,3
    expect(mergeVisibleOrder([1, 2, 3, 4, 5], [5, 1, 3])).toEqual([
      5, 2, 1, 4, 3,
    ]);
  });
});

describe("applyOrder", () => {
  it("sorts the notes and sets their positions", () => {
    const note = (id: number) => ({ id }) as Note;
    expect(applyOrder([note(1), note(2)], [2, 1])).toEqual([
      { id: 2, position: 0 },
      { id: 1, position: 1 },
    ]);
  });
});
