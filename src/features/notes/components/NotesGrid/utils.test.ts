import { describe, expect, it } from "vitest";

import { getDragCard, toColumns } from "./utils";

describe("toColumns", () => {
  it("fills columns row by row", () => {
    expect(toColumns([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 3, 5],
      [2, 4],
    ]);
  });

  it("uses one column at least", () => {
    expect(toColumns([1, 2], 0)).toEqual([[1, 2]]);
  });
});

describe("getDragCard", () => {
  it("finds the card, but not from its action buttons", () => {
    document.body.innerHTML =
      '<div data-note-id="7"><p id="text">hi</p><button id="action"></button></div>';
    expect(getDragCard(document.getElementById("text"))).toBe(
      document.querySelector("[data-note-id]"),
    );
    expect(getDragCard(document.getElementById("action"))).toBeNull();
  });
});
