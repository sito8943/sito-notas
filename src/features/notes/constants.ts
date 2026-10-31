export const ReactQueryKeys = {
  Notes: "notes",
} as const;

export const NoteQueryScope = {
  List: "list",
  Detail: "detail",
  Trash: "trash",
} as const;

/**
 * @param userId - owner of the list
 * @returns query key of the user's note list
 */
export const getNotesListKey = (userId: number | undefined) =>
  [ReactQueryKeys.Notes, NoteQueryScope.List, userId] as const;

/**
 * @param userId - owner of the trash
 * @returns query key of the user's trashed notes
 */
export const getTrashKey = (userId: number | undefined) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Trash, userId] as const;

/**
 * @param id - note id
 * @returns query key of one note
 */
export const getNoteDetailKey = (id: number) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Detail, id] as const;

/** localStorage key holding the cached notes list */
export const NOTES_STORAGE_KEY = "notes_cache";

/** Older notes show the date instead of "x days ago" */
export const RELATIVE_DATE_MAX_DAYS = 7;

export const NOTE_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
export const DAY_MS = 24 * HOUR;
const DAY = DAY_MS;

/** Largest unit first: the first one the elapsed time reaches is used */
export const RELATIVE_DATE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", DAY],
  ["hour", HOUR],
  ["minute", MINUTE],
];

export const RELATIVE_DATE_MAX_MS = RELATIVE_DATE_MAX_DAYS * DAY;

/** Days a deleted note stays in the trash before the server purges it */
export const TRASH_RETENTION_DAYS = 30;
