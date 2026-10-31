import { Editor } from "@tiptap/react";
import { afterEach, describe, expect, it } from "vitest";

import { createEditorExtensions } from "./utils";

let editor: Editor | undefined;

const roundTrip = (markdown: string): string => {
  editor = new Editor({
    extensions: createEditorExtensions(""),
    content: markdown,
    contentType: "markdown",
  });
  return editor.getMarkdown();
};

afterEach(() => editor?.destroy());

describe("createEditorExtensions", () => {
  it("keeps the lines of plain-text notes", () => {
    const text = roundTrip("first line\nsecond line\n\nnew paragraph");
    expect(text).toContain("first line");
    expect(text).toContain("second line");
    expect(text).toContain("new paragraph");
    // Not merged into one line
    expect(text).not.toContain("first line second line");
  });

  it("keeps markdown formatting", () => {
    const markdown = [
      "# Title",
      "",
      "Some **bold** and *italic* and `code`.",
      "",
      "- one",
      "- two",
      "",
      "1. first",
      "2. second",
      "",
      "> quote",
    ].join("\n");
    expect(roundTrip(markdown)).toBe(markdown);
  });

  it("keeps checklists", () => {
    const markdown = "- [ ] todo\n- [x] done";
    expect(roundTrip(markdown)).toBe(markdown);
  });
});
