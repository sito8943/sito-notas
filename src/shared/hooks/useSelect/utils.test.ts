import { describe, expect, it } from "vitest";
import { findTypeaheadIndex, getNextIndex } from "./utils";

describe("getNextIndex", () => {
  it("moves within bounds without wrapping", () => {
    expect(getNextIndex(0, "ArrowDown", 3)).toBe(1);
    expect(getNextIndex(2, "ArrowDown", 3)).toBe(2);
    expect(getNextIndex(0, "ArrowUp", 3)).toBe(0);
    expect(getNextIndex(2, "ArrowUp", 3)).toBe(1);
  });

  it("jumps to the ends", () => {
    expect(getNextIndex(1, "Home", 3)).toBe(0);
    expect(getNextIndex(1, "End", 3)).toBe(2);
  });

  it("ignores other keys", () => {
    expect(getNextIndex(1, "a", 3)).toBeUndefined();
  });
});

describe("findTypeaheadIndex", () => {
  const labels = ["Last viewed", "Name", "Next", "Slides"];

  it("finds the next match after the current option", () => {
    expect(findTypeaheadIndex(labels, "n", 0)).toBe(1);
    expect(findTypeaheadIndex(labels, "n", 1)).toBe(2);
  });

  it("wraps around and ignores case", () => {
    expect(findTypeaheadIndex(labels, "L", 3)).toBe(0);
  });

  it("returns -1 without a match", () => {
    expect(findTypeaheadIndex(labels, "z", 0)).toBe(-1);
  });
});
