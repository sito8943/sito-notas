import { toNoteCategories } from "@/features/notes/services/NoteApiClient/utils";
import { sortTagsByName } from "@/features/notes/utils";
import type { NoteCategory } from "@/features/notes/models";

/**
 * @param value - `/categories/common` response
 * @returns the well-formed tags, sorted by name
 */
export const toTags = (value: unknown): NoteCategory[] =>
  sortTagsByName(toNoteCategories(value));
