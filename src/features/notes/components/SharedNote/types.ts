import type { Note } from "@/features/notes/models";

export interface SharedNoteProps {
  /** Note shared with the user (has an owner) */
  note: Note;
}
