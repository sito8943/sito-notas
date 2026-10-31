import type { NoteCategory } from "@/features/notes/models";

export interface SetNoteTagsVariables {
  id: number;
  /** Every tag the note keeps, in display order */
  tags: NoteCategory[];
}
