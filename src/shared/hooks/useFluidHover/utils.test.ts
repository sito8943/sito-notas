import { describe, expect, it } from "vitest";
import { pickFluidItem } from "./utils";

const items = [
  { top: 0, bottom: 10, run: "a" },
  { top: 14, bottom: 24, run: "a" },
  { top: 40, bottom: 50, run: "b" },
];

describe("pickFluidItem", () => {
  it("picks the item under the pointer", () => {
    expect(pickFluidItem(5, items)).toBe(0);
    expect(pickFluidItem(45, items)).toBe(2);
  });

  it("picks the closer item in a gap inside a run, upper on a tie", () => {
    expect(pickFluidItem(11, items)).toBe(0);
    expect(pickFluidItem(12, items)).toBe(0);
    expect(pickFluidItem(13, items)).toBe(1);
  });

  it("hides between runs and outside the list", () => {
    expect(pickFluidItem(30, items)).toBeNull();
    expect(pickFluidItem(-1, items)).toBeNull();
    expect(pickFluidItem(60, items)).toBeNull();
  });
});
