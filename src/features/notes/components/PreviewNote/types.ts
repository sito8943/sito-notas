import type { Note } from "@/features/notes/models";

export interface PreviewNoteProps {
  note: Note;
  onDelete: (id: number) => void;
}
