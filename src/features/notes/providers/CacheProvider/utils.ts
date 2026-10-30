import { fromLocalObject } from "@/shared/lib/storage";

import { NOTES_STORAGE_KEY } from "@/features/notes/constants";
import type { Note } from "@/features/notes/models";

type CachedNote = Omit<Note, "categories" | "favorite"> & {
  categories?: unknown;
  favorite?: unknown;
};

const isNote = (value: unknown): value is CachedNote => {
  if (typeof value !== "object" || value === null) return false;
  const { id, title, content, updatedAt } = value as Record<string, unknown>;
  return (
    typeof id === "number" &&
    typeof title === "string" &&
    typeof content === "string" &&
    typeof updatedAt === "number"
  );
};

/**
 * Reads the cached list (entries from the old Supabase cache are dropped)
 * @returns cached notes, or undefined when there is no valid cache
 */
export const readCachedNotes = (): Note[] | undefined => {
  try {
    const cached = fromLocalObject<unknown>(NOTES_STORAGE_KEY);
    // Notes cached before tags/favorites existed lack those fields
    return Array.isArray(cached)
      ? cached.filter(isNote).map((note) => ({
          ...note,
          categories: Array.isArray(note.categories) ? note.categories : [],
          favorite: note.favorite === true,
        }))
      : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
