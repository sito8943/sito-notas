import { Editor } from "@tiptap/react";
import { afterEach, describe, expect, it } from "vitest";

import { createEditorExtensions } from "@/features/notes/components/NoteEditor/utils";

import { MoveDirection } from "./constants";
import type { MoveDirection as MoveDirectionValue } from "./types";
import { moveListItem } from "./utils";

let editor: Editor | undefined;

/** Editor with the cursor at the end of the first text equal to `cursorAt` */
const setup = (markdown: string, cursorAt: string): Editor => {
  editor = new Editor({
    extensions: createEditorExtensions(""),
    content: markdown,
    contentType: "markdown",
  });
  let target = -1;
  editor.state.doc.descendants((node, pos) => {
    if (target < 0 && node.isText && node.text === cursorAt)
      target = pos + node.nodeSize;
  });
  editor.commands.setTextSelection(target);
  return editor;
};

// StarterKit adds an empty paragraph after a list on any edit: ignore it
const markdownOf = (current: Editor) => current.getMarkdown().trim();

const move = (current: Editor, direction: MoveDirectionValue) =>
  moveListItem(current.state, direction, current.view.dispatch);

afterEach(() => editor?.destroy());

describe("moveListItem", () => {
  it("moves a bullet item up and down", () => {
    const current = setup("- one\n- two\n- three", "two");
    expect(move(current, MoveDirection.Up)).toBe(true);
    expect(markdownOf(current)).toBe("- two\n- one\n- three");
    expect(move(current, MoveDirection.Down)).toBe(true);
    expect(move(current, MoveDirection.Down)).toBe(true);
    expect(markdownOf(current)).toBe("- one\n- three\n- two");
  });

  it("keeps the cursor in the moved item", () => {
    const current = setup("- one\n- two", "two");
    move(current, MoveDirection.Up);
    expect(current.state.selection.$from.parent.textContent).toBe("two");
  });

  it("moves checklist items with their state", () => {
    const current = setup("- [ ] todo\n- [x] done", "done");
    move(current, MoveDirection.Up);
    expect(markdownOf(current)).toBe("- [x] done\n- [ ] todo");
  });

  it("moves an item with its nested items", () => {
    const current = setup("- a\n  - a1\n- b", "a");
    move(current, MoveDirection.Down);
    expect(markdownOf(current)).toBe("- b\n- a\n  - a1");
  });

  it("moves nested items inside their own list", () => {
    const current = setup("- a\n  - a1\n  - a2\n- b", "a2");
    move(current, MoveDirection.Up);
    expect(markdownOf(current)).toBe("- a\n  - a2\n  - a1\n- b");
  });

  it("does nothing at the edges or outside a list", () => {
    const first = setup("- one\n- two", "one");
    expect(move(first, MoveDirection.Up)).toBe(false);
    first.destroy();
    const text = setup("plain\n\n- one", "plain");
    expect(move(text, MoveDirection.Down)).toBe(false);
  });
});
