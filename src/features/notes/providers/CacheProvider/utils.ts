import { fromLocalObject } from "@/shared/lib/storage";

import { NOTES_STORAGE_KEY } from "@/features/notes/constants";
import type { Note } from "@/features/notes/models";

const isNote = (value: unknown): value is Note => {
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
    return Array.isArray(cached) ? cached.filter(isNote) : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
