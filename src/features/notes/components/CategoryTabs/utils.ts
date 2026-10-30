import type { Note, NoteCategory } from "@/features/notes/models";

/**
 * @param notes - loaded notes
 * @returns the tags used by the notes, once each, sorted by name
 */
export const getUsedCategories = (notes: Note[]): NoteCategory[] => {
  const byId = new Map<number, NoteCategory>();
  for (const note of notes)
    for (const category of note.categories) byId.set(category.id, category);
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
};
