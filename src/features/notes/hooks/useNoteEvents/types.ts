export interface NoteUpdatedEvent {
  type: "NOTE_UPDATED";
  noteId: number;
  title: string;
  content: string;
  /** Epoch ms */
  updatedAt: number;
  /** User who saved it */
  editorId?: number;
}

export interface NoteAccessChangedEvent {
  type: "ACCESS_CHANGED";
  noteId: number;
}

/** Live note event from /user/queue/notes */
export type NoteEvent = NoteUpdatedEvent | NoteAccessChangedEvent;
