import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Placeholder } from "@tiptap/extensions";
import Image from "@tiptap/extension-image";
import { Markdown } from "@tiptap/markdown";
import type { Slice } from "@tiptap/pm/model";

import { MARKDOWN_PARSE_OPTIONS } from "./constants";
import { ModClickLink } from "./ModClickLink";
import { MoveListItem } from "./MoveListItem";
import { PasteImage, type ImageUploader } from "./PasteImage";

/**
 * Editor features. Only formats Markdown can store are enabled, so saving
 * never drops anything (no underline).
 * @param placeholder - text shown while the note is empty
 * @param getUploader - current image uploader (none: pasted images are
 * ignored)
 * @returns Tiptap extensions
 */
export const createEditorExtensions = (
  placeholder: string,
  getUploader: () => ImageUploader | undefined = () => undefined,
) => [
  StarterKit.configure({
    underline: false,
    link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
  }),
  TaskList,
  TaskItem.configure({ nested: true }),
  MoveListItem,
  ModClickLink,
  Image.configure({ HTMLAttributes: { class: "note-editor-image" } }),
  PasteImage.configure({ getUploader }),
  Placeholder.configure({ placeholder }),
  Markdown.configure({ markedOptions: MARKDOWN_PARSE_OPTIONS }),
];

/**
 * Plain text put on the clipboard when copying. One line per paragraph,
 * heading or list item, so pasting into chats (WhatsApp) keeps the layout.
 * Tiptap's default adds a blank line per block level, and nested lists
 * pile them up.
 * @param slice - copied content
 * @returns text with a line break between text blocks
 */
export const serializeClipboardText = (slice: Slice) =>
  slice.content.textBetween(0, slice.content.size, "\n", (leaf) =>
    leaf.type.name === "hardBreak" ? "\n" : "",
  );
