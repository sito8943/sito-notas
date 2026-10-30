import type { Note } from "@/features/notes/models";

/**
 * @param notes - cached list
 * @param id - note to change
 * @param favorite - new flag
 * @returns a copy of the list with the note's flag changed
 */
export const withFavorite = (
  notes: Note[] | undefined,
  id: number,
  favorite: boolean,
): Note[] | undefined =>
  notes?.map((note) => (note.id === id ? { ...note, favorite } : note));
