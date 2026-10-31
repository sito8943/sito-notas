import {
  SharePermission,
  type Note,
  type NoteCategory,
  type NoteOwner,
  type NoteShare,
  type PublicNote,
  type PageDto,
} from "@/features/notes/models";

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
 * @param value - `owner` of a shared NoteDTO
 * @returns the owner, or undefined when missing/malformed
 */
export const toNoteOwner = (value: unknown): NoteOwner | undefined =>
  isRecord(value) &&
  typeof value.id === "number" &&
  typeof value.email === "string"
    ? {
        id: value.id,
        email: value.email,
        ...(typeof value.username === "string" && value.username
          ? { username: value.username }
          : {}),
      }
    : undefined;

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
  const owner = toNoteOwner(value.owner);
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
    ...(owner
      ? {
          owner,
          permission:
            value.permission === SharePermission.Edit
              ? SharePermission.Edit
              : SharePermission.Read,
        }
      : {}),
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

/**
 * Validates and maps a NoteShareDTO
 * @param value - one share of the API response
 * @returns the share
 * @throws Error when the user id or email is missing
 */
export const toNoteShare = (value: unknown): NoteShare => {
  if (
    !isRecord(value) ||
    typeof value.userId !== "number" ||
    typeof value.email !== "string"
  )
    throw new Error("Invalid note share");
  return {
    userId: value.userId,
    email: value.email,
    ...(typeof value.username === "string" && value.username
      ? { username: value.username }
      : {}),
    permission:
      value.permission === SharePermission.Edit
        ? SharePermission.Edit
        : SharePermission.Read,
    createdAt: parseApiDate(value.createdAt),
  };
};

/**
 * @param value - parsed response body
 * @returns the well-formed shares
 * @throws Error when it is not a list
 */
export const toNoteShares = (value: unknown): NoteShare[] => {
  if (!Array.isArray(value)) throw new Error("Invalid note shares response");
  return value.map(toNoteShare);
};

/**
 * @param value - body of the link endpoints
 * @returns the link token, or null when the note has no public link
 */
export const toLinkToken = (value: unknown): string | null =>
  isRecord(value) && typeof value.token === "string" && value.token
    ? value.token
    : null;

/**
 * Validates and maps a PublicNoteDTO
 * @param value - parsed response body
 * @returns the public note
 * @throws Error when it is not an object
 */
export const toPublicNote = (value: unknown): PublicNote => {
  if (!isRecord(value)) throw new Error("Invalid public note");
  return {
    ...(typeof value.noteId === "number" ? { noteId: value.noteId } : {}),
    title: typeof value.title === "string" ? value.title : "",
    content: typeof value.content === "string" ? value.content : "",
    updatedAt: parseApiDate(value.updatedAt),
    ownerName: typeof value.ownerName === "string" ? value.ownerName : "",
  };
};

/**
 * @param value - body of the unseen count endpoint
 * @returns how many shared notes are new (0 when malformed)
 */
export const toUnseenCount = (value: unknown): number =>
  isRecord(value) && typeof value.count === "number" && value.count > 0
    ? value.count
    : 0;
