import type { Note } from "@/features/notes/models";

export interface TrashNoteProps {
  note: Note;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
  /** An action on the trash is running */
  disabled?: boolean;
}
