import { describe, expect, it } from "vitest";

import { NOTE_IMAGE_MAX_BYTES, NoteImageError } from "./constants";
import { getNoteImageError, insertText, toMarkdownImage } from "./utils";

const file = (type: string, size = 10) =>
  new File([new Uint8Array(size)], "x", { type });

describe("getNoteImageError", () => {
  it("accepts supported images", () => {
    expect(getNoteImageError(file("image/png"))).toBeNull();
  });

  it("rejects other types and big files", () => {
    expect(getNoteImageError(file("image/svg+xml"))).toBe(
      NoteImageError.InvalidType,
    );
    expect(getNoteImageError(file("image/png", NOTE_IMAGE_MAX_BYTES + 1))).toBe(
      NoteImageError.TooLarge,
    );
  });
});

describe("insertText", () => {
  it("replaces the selection", () => {
    expect(insertText("hello world", "X", 6, 11)).toBe("hello X");
  });

  it("clamps positions past the end", () => {
    expect(insertText("ab", "X", 5, 9)).toBe("abX");
  });
});

it("builds a markdown image", () => {
  expect(toMarkdownImage("https://a/b.png")).toBe("![](https://a/b.png)");
});
