import { describe, expect, it } from "vitest";

import type { Note } from "@/features/notes/models";

import { toNoteEvent, withNoteUpdateInList } from "./utils";

const note = (id: number): Note => ({
  id,
  title: `t${id}`,
  content: "old",
  categories: [],
  favorite: false,
  createdAt: 1,
  updatedAt: 1,
});

describe("toNoteEvent", () => {
  it("parses both event types", () => {
    expect(
      toNoteEvent({
        type: "NOTE_UPDATED",
        noteId: 4,
        title: "T",
        content: "C",
        updatedAt: "2026-10-31T10:00:00",
        editorId: 2,
      }),
    ).toEqual({
      type: "NOTE_UPDATED",
      noteId: 4,
      title: "T",
      content: "C",
      updatedAt: Date.UTC(2026, 9, 31, 10, 0, 0),
      editorId: 2,
    });
    expect(toNoteEvent({ type: "ACCESS_CHANGED", noteId: 4 })).toEqual({
      type: "ACCESS_CHANGED",
      noteId: 4,
    });
  });

  it("rejects unknown bodies", () => {
    expect(toNoteEvent(null)).toBeNull();
    expect(toNoteEvent({ type: "OTHER", noteId: 1 })).toBeNull();
    expect(toNoteEvent({ type: "ACCESS_CHANGED" })).toBeNull();
  });
});

describe("withNoteUpdateInList", () => {
  const event = {
    type: "NOTE_UPDATED" as const,
    noteId: 2,
    title: "New",
    content: "new",
    updatedAt: 5,
  };

  it("updates only the matching note", () => {
    const list = [note(1), note(2)];
    const next = withNoteUpdateInList(list, event);
    expect(next?.[0]).toBe(list[0]);
    expect(next?.[1]).toMatchObject({ title: "New", content: "new" });
  });

  it("keeps the same list when the note is not there", () => {
    const list = [note(1)];
    expect(withNoteUpdateInList(list, event)).toBe(list);
    expect(withNoteUpdateInList(undefined, event)).toBeUndefined();
  });
});
