export const NoteEndpoint = {
  Notes: "/notes",
} as const;

/** Page size used to load every note of the user */
export const NOTES_PAGE_SIZE = 100;

/** Safety stop for paging (NOTES_PAGE_SIZE * this = max notes loaded) */
export const MAX_NOTE_PAGES = 100;

export const NOTES_LIST_QUERY = {
  sort: "updatedAt",
  order: "DESC",
  softDeleteScope: "ACTIVE",
} as const;
