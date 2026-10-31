import type { Note } from "@/features/notes/models";

export interface NoteTagsDialogProps {
  /** Note whose tags are edited; null closes the dialog */
  note: Note | null;
  onClose: () => void;
}
