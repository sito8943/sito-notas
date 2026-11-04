import type { NoteEditorMode as NoteEditorModeValues } from "./constants";

import type { Editor } from "@tiptap/react";

import type { ImageUploader } from "./PasteImage";

export type NoteEditorMode =
  (typeof NoteEditorModeValues)[keyof typeof NoteEditorModeValues];

export interface NoteEditorProps {
  /** Markdown read when the editor mounts */
  content: string;
  /** Called with the Markdown of every change */
  onChange: (content: string) => void;
  placeholder: string;
  /** Accessible name of the writing area */
  label: string;
  /** View only: no toolbar, no edits */
  readOnly?: boolean;
  /** Receives the editor once it exists, and null on unmount */
  onEditorChange?: (editor: Editor | null) => void;
  /** Uploads pasted/dropped images; without it they are ignored */
  onUploadImage?: ImageUploader;
}
