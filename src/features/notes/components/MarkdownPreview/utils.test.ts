import { describe, expect, it } from "vitest";

import { PREVIEW_CONTENT_LENGTH } from "./constants";
import { toPreviewHtml, truncateMarkdown } from "./utils";

describe("toPreviewHtml", () => {
  it("renders the markdown formatting", () => {
    const html = toPreviewHtml("# Title\n\nSome **bold**\n\n- one\n- two");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<li>one</li>");
  });

  it("renders checklists as checkboxes", () => {
    expect(toPreviewHtml("- [x] done")).toContain('type="checkbox"');
  });

  it("keeps link text but drops the link", () => {
    const html = toPreviewHtml("[a link](https://x.y)");
    expect(html).toContain("a link");
    expect(html).not.toContain("<a");
  });

  it("never runs markup from the note", () => {
    const html = toPreviewHtml(
      '<img src=x onerror="window.hacked=1">hi<script>window.hacked=1</script>',
    );
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
  });
});

describe("truncateMarkdown", () => {
  it("cuts long notes at a line break", () => {
    const line = "**bold** text\n";
    const markdown = line.repeat(100);
    const cut = truncateMarkdown(markdown);
    expect(cut.length).toBeLessThanOrEqual(PREVIEW_CONTENT_LENGTH);
    expect(cut.endsWith("text")).toBe(true);
  });

  it("keeps short notes untouched", () => {
    expect(truncateMarkdown("short")).toBe("short");
  });
});
