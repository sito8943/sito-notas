import { describe, expect, it } from "vitest";

import { getPageTabLabelKey, getTabNoteId } from "./utils";

describe("tab label", () => {
  it("reads the note id of note tabs", () => {
    expect(getTabNoteId("/note/12")).toBe(12);
    expect(getTabNoteId("/note/12?x=1")).toBe(12);
    expect(getTabNoteId("/note/abc")).toBeNull();
    expect(getTabNoteId("/")).toBeNull();
  });

  it("names the other pages, and unknown ones as the notes list", () => {
    expect(getPageTabLabelKey("/")).toBe("_pages:routes.home");
    expect(getPageTabLabelKey("/trash")).toBe("_pages:routes.trash");
    expect(getPageTabLabelKey("/calendar")).toBe("_pages:routes.home");
  });
});
