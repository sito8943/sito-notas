import type { Note } from "@/features/notes/models";

export interface PreviewNoteProps {
  note: Note;
  onDelete: (id: number) => void;
  /** Opens the tag dialog (button shown on small screens only; wide
   *  screens use the right-click menu) */
  onAddTags: (id: number) => void;
}
