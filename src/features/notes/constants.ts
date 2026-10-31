export const ReactQueryKeys = {
  Notes: "notes",
  Tags: "tags",
} as const;

export const NoteQueryScope = {
  List: "list",
  Detail: "detail",
  Trash: "trash",
  Shares: "shares",
  Shared: "shared",
  Link: "link",
  Public: "public",
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

/**
 * @param userId - user the notes are shared with
 * @returns query key of the notes shared with the user
 */
export const getSharedNotesKey = (userId: number | undefined) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Shared, userId] as const;

/**
 * @param id - note id
 * @returns query key of the note's public link
 */
export const getNoteLinkKey = (id: number) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Link, id] as const;

/**
 * @param token - public link token
 * @returns query key of a note read by its public link
 */
export const getPublicNoteKey = (token: string) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Public, token] as const;

/**
 * @param id - note id
 * @returns query key of the users a note is shared with
 */
export const getNoteSharesKey = (id: number) =>
  [ReactQueryKeys.Notes, NoteQueryScope.Shares, id] as const;

/**
 * @param userId - owner of the tags
 * @returns query key of the user's tags
 */
export const getTagsKey = (userId: number | undefined) =>
  [ReactQueryKeys.Tags, userId] as const;

/** Tag colors: readable on light and dark surfaces (#RRGGBB for the API) */
export const TAG_COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
  "#F97316",
] as const;

/** Longest tag name accepted */
export const TAG_NAME_MAX_LENGTH = 40;

/** Tags shown on a note card before "+N" */
export const CARD_MAX_TAGS = 2;

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
