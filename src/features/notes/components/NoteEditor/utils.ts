import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";

import { MARKDOWN_PARSE_OPTIONS } from "./constants";

/**
 * Editor features. Only formats Markdown can store are enabled, so saving
 * never drops anything (no underline).
 * @param placeholder - text shown while the note is empty
 * @returns Tiptap extensions
 */
export const createEditorExtensions = (placeholder: string) => [
  StarterKit.configure({
    underline: false,
    link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
  }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Placeholder.configure({ placeholder }),
  Markdown.configure({ markedOptions: MARKDOWN_PARSE_OPTIONS }),
];
