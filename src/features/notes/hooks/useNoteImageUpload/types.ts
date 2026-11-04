import type { ClipboardEvent } from "react";

import type { ImageUploader } from "@/features/notes/components/NoteEditor";

import type { NoteImageError } from "./constants";

export type NoteImageErrorKey =
  (typeof NoteImageError)[keyof typeof NoteImageError];

export interface UseNoteImageUploadOptions {
  noteId: number | null;
  /** Markdown source, to insert images pasted into it */
  content: string;
  setContent: (content: string) => void;
}

export interface UseNoteImageUploadResult {
  /** For the rich editor */
  upload: ImageUploader;
  /** Paste handler of the Markdown source textarea */
  onSourcePaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  isUploading: boolean;
}
