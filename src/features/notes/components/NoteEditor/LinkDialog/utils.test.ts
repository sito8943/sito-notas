import { describe, expect, it } from "vitest";

import { isSafeLinkUrl, normalizeLinkUrl } from "./utils";

describe("normalizeLinkUrl", () => {
  it("adds https:// when there is no scheme", () => {
    expect(normalizeLinkUrl(" sito8943.com ")).toBe("https://sito8943.com");
    expect(normalizeLinkUrl("mailto:a@b.com")).toBe("mailto:a@b.com");
    expect(normalizeLinkUrl("  ")).toBe("");
  });
});

describe("isSafeLinkUrl", () => {
  it("allows web, mail and phone links only", () => {
    expect(isSafeLinkUrl("https://sito8943.com")).toBe(true);
    expect(isSafeLinkUrl("mailto:a@b.com")).toBe(true);
    expect(isSafeLinkUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeLinkUrl("https://")).toBe(false);
  });
});
