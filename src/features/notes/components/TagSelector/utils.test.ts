import { describe, expect, it } from "vitest";

import { getTagSelectorOptions } from "./utils";

const tags = [
  { id: 1, name: "Trabajo" },
  { id: 2, name: "Ideas" },
];

describe("getTagSelectorOptions", () => {
  it("lists every tag without a query", () => {
    expect(getTagSelectorOptions(tags, "")).toHaveLength(2);
  });

  it("filters ignoring case and accents and offers to create", () => {
    expect(getTagSelectorOptions(tags, "TRÁB")).toEqual([
      { type: "tag", tag: tags[0] },
      { type: "create", name: "TRÁB" },
    ]);
  });

  it("does not offer to create an existing name", () => {
    expect(getTagSelectorOptions(tags, " ideas ")).toEqual([
      { type: "tag", tag: tags[1] },
    ]);
  });
});
