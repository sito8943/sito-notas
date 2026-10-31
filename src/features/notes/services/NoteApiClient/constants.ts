export const NoteEndpoint = {
  Notes: "/notes",
  Restore: "/notes/restore",
  Permanent: "/notes/permanent",
  Reorder: "/notes/reorder",
  Shared: "/notes/shared",
  SharedUnseen: "/notes/shared/unseen",
  SharedSeen: "/notes/shared/seen",
} as const;

/**
 * @param noteId - note id
 * @returns endpoint of the note's public link
 */
export const getNoteLinkEndpoint = (noteId: number) =>
  `${NoteEndpoint.Notes}/${noteId}/link`;

/**
 * @param token - public link token
 * @returns endpoint that reads a note by its public link (no login)
 */
export const getPublicNoteEndpoint = (token: string) =>
  `/public/notes/${encodeURIComponent(token)}`;

/**
 * @param noteId - note id
 * @returns endpoint of the users the note is shared with
 */
export const getNoteSharesEndpoint = (noteId: number) =>
  `${NoteEndpoint.Notes}/${noteId}/shares`;

/** Page size used to load every note of the user */
export const NOTES_PAGE_SIZE = 100;

/** Safety stop for paging (NOTES_PAGE_SIZE * this = max notes loaded) */
export const MAX_NOTE_PAGES = 100;

export const NOTES_LIST_QUERY = {
  sort: "updatedAt",
  order: "DESC",
  softDeleteScope: "ACTIVE",
} as const;

/** Notes in the trash (soft-deleted) */
export const TRASH_LIST_QUERY = {
  sort: "updatedAt",
  order: "DESC",
  softDeleteScope: "DELETED",
} as const;
