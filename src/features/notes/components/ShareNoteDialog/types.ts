import type { Note } from "@/features/notes/models";

/** What the dialog needs of the note being shared */
export type SharedNoteSummary = Pick<Note, "id" | "title" | "content">;

export interface ShareNoteDialogProps {
  /** Note being shared (current title and content); null closes the dialog */
  note: SharedNoteSummary | null;
  onClose: () => void;
}
