import {
  faBold,
  faCode,
  faItalic,
  faListCheck,
  faListOl,
  faListUl,
  faRotateLeft,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";

import type { EditorBlockType, EditorToolbarAction } from "./types";

export const INLINE_ACTIONS: EditorToolbarAction[] = [
  {
    id: "bold",
    hotkey: "Mod-B",
    labelKey: "_pages:note.toolbar.bold",
    icon: faBold,
    run: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    id: "italic",
    hotkey: "Mod-I",
    labelKey: "_pages:note.toolbar.italic",
    icon: faItalic,
    run: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    id: "strike",
    hotkey: "Mod-Shift-S",
    labelKey: "_pages:note.toolbar.strike",
    icon: faStrikethrough,
    run: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
];

/** Lists; the link button follows them */
export const LIST_ACTIONS: EditorToolbarAction[] = [
  {
    id: "bulletList",
    hotkey: "Mod-Shift-8",
    labelKey: "_pages:note.toolbar.bulletList",
    icon: faListUl,
    run: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    id: "orderedList",
    hotkey: "Mod-Shift-7",
    labelKey: "_pages:note.toolbar.orderedList",
    icon: faListOl,
    run: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    id: "taskList",
    hotkey: "Mod-Shift-9",
    labelKey: "_pages:note.toolbar.taskList",
    icon: faListCheck,
    run: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskList"),
  },
];

/** After the link button */
export const CODE_ACTION: EditorToolbarAction = {
  id: "code",
  hotkey: "Mod-E",
  labelKey: "_pages:note.toolbar.code",
  icon: faCode,
  run: (editor) => editor.chain().focus().toggleCode().run(),
  isActive: (editor) => editor.isActive("code"),
};

/** Redo stays on Mod-Shift-Z */
export const UNDO_ACTION: EditorToolbarAction = {
  id: "undo",
  hotkey: "Mod-Z",
  labelKey: "_pages:note.toolbar.undo",
  icon: faRotateLeft,
  run: (editor) => editor.chain().focus().undo().run(),
  canRun: (editor) => editor.can().undo(),
};

export const TOOLBAR_ACTIONS: EditorToolbarAction[] = [
  ...INLINE_ACTIONS,
  ...LIST_ACTIONS,
  CODE_ACTION,
  UNDO_ACTION,
];

export const PARAGRAPH_BLOCK_ID = "paragraph";

/** How Tiptap key names are shown on each platform */
export const HOTKEY_SYMBOLS_MAC: Record<string, string> = {
  Mod: "⌘",
  Shift: "⇧",
  Alt: "⌥",
};

export const HOTKEY_SYMBOLS_OTHER: Record<string, string> = {
  Mod: "Ctrl",
  Shift: "Shift",
  Alt: "Alt",
};

/** Tooltips open below: above the toolbar they would leave the scroll area */
export const TOOLBAR_TOOLTIP_SIDE = "bottom";

const HEADING_LEVELS = [1, 2, 3] as const;

/** Block menu entries, in order; a divider is drawn before "horizontalRule" */
export const BLOCK_TYPES: EditorBlockType[] = [
  {
    id: PARAGRAPH_BLOCK_ID,
    labelKey: "_pages:note.toolbar.paragraph",
    shortLabelKey: "_pages:note.toolbar.paragraph",
    run: (editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor) => editor.isActive("paragraph"),
  },
  ...HEADING_LEVELS.map((level): EditorBlockType => ({
    id: `heading${level}`,
    labelKey: `_pages:note.toolbar.heading${level}`,
    shortLabelKey: `_pages:note.toolbar.heading${level}Short`,
    run: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: (editor) => editor.isActive("heading", { level }),
  })),
  {
    id: "blockquote",
    hotkey: "Mod-Shift-B",
    labelKey: "_pages:note.toolbar.blockquote",
    shortLabelKey: "_pages:note.toolbar.blockquote",
    run: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    id: "codeBlock",
    hotkey: "Mod-Alt-C",
    labelKey: "_pages:note.toolbar.codeBlock",
    shortLabelKey: "_pages:note.toolbar.codeBlockShort",
    run: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  {
    id: "horizontalRule",
    labelKey: "_pages:note.toolbar.horizontalRule",
    shortLabelKey: "_pages:note.toolbar.horizontalRule",
    run: (editor) => editor.chain().focus().setHorizontalRule().run(),
  },
];

/** Space between a menu and the button that opens it */
export const MENU_OFFSET_PX = 6;
