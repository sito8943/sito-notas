/** Where the Notes API sends live note events for the signed-in user */
export const NOTE_EVENTS_DESTINATION = "/user/queue/notes";

export const NoteEventType = {
  /** Title or content saved by someone */
  NoteUpdated: "NOTE_UPDATED",
  /** The user's access to the note changed (shared, unshared, trashed…) */
  AccessChanged: "ACCESS_CHANGED",
} as const;
