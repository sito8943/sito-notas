import { describe, expect, it } from "vitest";

import { toExcerpt } from "./utils";

describe("toExcerpt", () => {
  it("returns the plain text of the markdown", () => {
    expect(
      toExcerpt("# Title\n\nSome **bold** and [a link](https://x.y)"),
    ).toBe("Title Some bold and a link");
  });

  it("never runs markup from the note", () => {
    const excerpt = toExcerpt('<img src=x onerror="window.hacked=1">hi');
    expect(excerpt).toBe("hi");
    expect((window as unknown as { hacked?: number }).hacked).toBeUndefined();
  });
});
