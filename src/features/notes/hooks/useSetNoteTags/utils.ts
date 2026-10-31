import type { Note, NoteCategory } from "@/features/notes/models";

/**
 * @param notes - cached list
 * @param id - note to change
 * @param tags - every tag the note keeps
 * @returns a copy of the list with the note's tags replaced
 */
export const withNoteTags = (
  notes: Note[] | undefined,
  id: number,
  tags: NoteCategory[],
): Note[] | undefined =>
  notes?.map((note) => (note.id === id ? { ...note, categories: tags } : note));
