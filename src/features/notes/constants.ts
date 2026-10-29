export const ReactQueryKeys = {
  Notes: "notes",
} as const;

export const NoteQueryScope = {
  List: "list",
  Detail: "detail",
} as const;

/**
 * @param userId - owner of the list
 * @returns query key of the user's note list
 */
export const getNotesListKey = (userId: number | undefined) =>
  [ReactQueryKeys.Notes, NoteQueryScope.List, userId] as const;

/**
 * @param id - note id
 * @returns query key of one note
 */
export const getNoteDetailKey = (id: number) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Detail, id] as const;

/** localStorage key holding the cached notes list */
export const NOTES_STORAGE_KEY = "notes_cache";
