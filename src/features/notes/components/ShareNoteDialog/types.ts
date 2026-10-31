import type { Note } from "@/features/notes/models";

export interface ShareNoteDialogProps {
  /** Note being shared (current title and content); null closes the dialog */
  note: Pick<Note, "id" | "title" | "content"> | null;
  onClose: () => void;
}
