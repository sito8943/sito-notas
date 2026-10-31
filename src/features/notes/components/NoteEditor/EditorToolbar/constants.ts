import {
  faBold,
  faCode,
  faItalic,
  faListCheck,
  faListOl,
  faListUl,
  faMinus,
  faQuoteLeft,
  faRotateLeft,
  faRotateRight,
  faStrikethrough,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

import type { EditorToolbarAction } from "./types";

const HEADING_LEVELS = [1, 2, 3] as const;

/** Toolbar buttons, grouped; groups are split by a divider */
export const EDITOR_TOOLBAR_GROUPS: EditorToolbarAction[][] = [
  [
    {
      id: "bold",
      labelKey: "_pages:note.toolbar.bold",
      icon: faBold,
      run: (editor) => editor.chain().focus().toggleBold().run(),
      isActive: (editor) => editor.isActive("bold"),
    },
    {
      id: "italic",
      labelKey: "_pages:note.toolbar.italic",
      icon: faItalic,
      run: (editor) => editor.chain().focus().toggleItalic().run(),
      isActive: (editor) => editor.isActive("italic"),
    },
    {
      id: "strike",
      labelKey: "_pages:note.toolbar.strike",
      icon: faStrikethrough,
      run: (editor) => editor.chain().focus().toggleStrike().run(),
      isActive: (editor) => editor.isActive("strike"),
    },
    {
      id: "code",
      labelKey: "_pages:note.toolbar.code",
      icon: faCode,
      run: (editor) => editor.chain().focus().toggleCode().run(),
      isActive: (editor) => editor.isActive("code"),
    },
  ],
  HEADING_LEVELS.map((level) => ({
    id: `heading${level}`,
    labelKey: `_pages:note.toolbar.heading${level}`,
    text: `H${level}`,
    run: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: (editor) => editor.isActive("heading", { level }),
  })),
  [
    {
      id: "bulletList",
      labelKey: "_pages:note.toolbar.bulletList",
      icon: faListUl,
      run: (editor) => editor.chain().focus().toggleBulletList().run(),
      isActive: (editor) => editor.isActive("bulletList"),
    },
    {
      id: "orderedList",
      labelKey: "_pages:note.toolbar.orderedList",
      icon: faListOl,
      run: (editor) => editor.chain().focus().toggleOrderedList().run(),
      isActive: (editor) => editor.isActive("orderedList"),
    },
    {
      id: "taskList",
      labelKey: "_pages:note.toolbar.taskList",
      icon: faListCheck,
      run: (editor) => editor.chain().focus().toggleTaskList().run(),
      isActive: (editor) => editor.isActive("taskList"),
    },
  ],
  [
    {
      id: "blockquote",
      labelKey: "_pages:note.toolbar.blockquote",
      icon: faQuoteLeft,
      run: (editor) => editor.chain().focus().toggleBlockquote().run(),
      isActive: (editor) => editor.isActive("blockquote"),
    },
    {
      id: "codeBlock",
      labelKey: "_pages:note.toolbar.codeBlock",
      icon: faTerminal,
      run: (editor) => editor.chain().focus().toggleCodeBlock().run(),
      isActive: (editor) => editor.isActive("codeBlock"),
    },
    {
      id: "horizontalRule",
      labelKey: "_pages:note.toolbar.horizontalRule",
      icon: faMinus,
      run: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },
  ],
  [
    {
      id: "undo",
      labelKey: "_pages:note.toolbar.undo",
      icon: faRotateLeft,
      run: (editor) => editor.chain().focus().undo().run(),
      canRun: (editor) => editor.can().undo(),
    },
    {
      id: "redo",
      labelKey: "_pages:note.toolbar.redo",
      icon: faRotateRight,
      run: (editor) => editor.chain().focus().redo().run(),
      canRun: (editor) => editor.can().redo(),
    },
  ],
];
