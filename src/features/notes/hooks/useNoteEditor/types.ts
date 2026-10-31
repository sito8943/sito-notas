import type { Note } from "@/features/notes/models";

import type { NoteSaveStatus as NoteSaveStatusValues } from "./constants";

export type NoteSaveStatus =
  (typeof NoteSaveStatusValues)[keyof typeof NoteSaveStatusValues];

export interface UseNoteEditorResult {
  /** Note as last loaded or saved */
  note: Note | undefined;
  isLoading: boolean;
  /** The id is invalid or the note could not be loaded */
  notFound: boolean;
  /** Current title, including unsaved edits */
  title: string;
  /** Current markdown content, including unsaved edits */
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  status: NoteSaveStatus;
  /** Drops unsaved edits (e.g. before deleting the note) */
  discard: () => void;
}
