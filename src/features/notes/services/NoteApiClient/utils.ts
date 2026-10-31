import type { Note, NoteCategory, PageDto } from "@/features/notes/models";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** Zone suffix such as "Z", "+02:00" or "-0500" */
const ZONE_SUFFIX = /(Z|[+-]\d{2}:?\d{2})$/i;

/**
 * The API sends LocalDateTime without zone; the server runs in UTC.
 * @param value - ISO date-time
 * @returns epoch milliseconds, or 0 when missing/invalid
 */
export const parseApiDate = (value: unknown): number => {
  if (typeof value !== "string" || !value) return 0;
  const parsed = Date.parse(ZONE_SUFFIX.test(value) ? value : `${value}Z`);
  return Number.isNaN(parsed) ? 0 : parsed;
};

/**
 * Keeps the well-formed categories of a NoteDTO
 * @param value - `categories` of one item of the API response
 * @returns the note tags
 */
export const toNoteCategories = (value: unknown): NoteCategory[] =>
  Array.isArray(value)
    ? value.flatMap((item) =>
        isRecord(item) &&
        typeof item.id === "number" &&
        typeof item.name === "string"
          ? [
              {
                id: item.id,
                name: item.name,
                ...(typeof item.color === "string"
                  ? { color: item.color }
                  : {}),
              },
            ]
          : [],
      )
    : [];

/**
 * Validates and maps a NoteDTO
 * @param value - one item of the API response
 * @returns the UI note
 * @throws Error when the id is missing
 */
export const toNote = (value: unknown): Note => {
  if (!isRecord(value) || typeof value.id !== "number")
    throw new Error("Invalid note");
  const createdAt = parseApiDate(value.createdAt);
  const deletedAt = parseApiDate(value.deletedAt);
  return {
    id: value.id,
    title: typeof value.title === "string" ? value.title : "",
    content: typeof value.content === "string" ? value.content : "",
    categories: toNoteCategories(value.categories),
    favorite: value.favorite === true,
    createdAt,
    updatedAt: parseApiDate(value.updatedAt) || createdAt,
    ...(deletedAt ? { deletedAt } : {}),
    ...(typeof value.position === "number" ? { position: value.position } : {}),
  };
};

/**
 * Validates a page response
 * @param value - parsed response body
 * @returns the page with raw items
 * @throws Error when it is not a page
 */
export const parsePage = (value: unknown): PageDto<unknown> => {
  if (!isRecord(value) || !Array.isArray(value.items))
    throw new Error("Invalid page response");
  return {
    items: value.items,
    currentPage: typeof value.currentPage === "number" ? value.currentPage : 0,
    pageSize: typeof value.pageSize === "number" ? value.pageSize : 0,
    totalElements:
      typeof value.totalElements === "number" ? value.totalElements : 0,
    totalPages: typeof value.totalPages === "number" ? value.totalPages : 0,
  };
};

/**
 * @param notes - notes to sort
 * @returns a copy sorted by last update, newest first
 */
export const sortByUpdatedAtDesc = (notes: Note[]): Note[] =>
  [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

/**
 * Manual order first (lower position on top), then notes never ordered,
 * each group newest update first
 * @param notes - notes to sort
 * @returns a sorted copy
 */
export const sortByPosition = (notes: Note[]): Note[] =>
  [...notes].sort((a, b) => {
    if (a.position !== undefined && b.position !== undefined)
      return a.position - b.position || b.updatedAt - a.updatedAt;
    if (a.position !== undefined) return -1;
    if (b.position !== undefined) return 1;
    return b.updatedAt - a.updatedAt;
  });

/**
 * @param notes - trashed notes
 * @returns the notes, most recently deleted first
 */
export const sortByDeletedAtDesc = (notes: Note[]): Note[] =>
  [...notes].sort((a, b) => (b.deletedAt ?? 0) - (a.deletedAt ?? 0));
