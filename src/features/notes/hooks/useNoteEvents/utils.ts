import { parseApiDate } from "@/features/notes/services";
import type { Note } from "@/features/notes/models";

import { NoteEventType } from "./constants";
import type { NoteEvent, NoteUpdatedEvent } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Validates a socket message body
 * @param body - parsed message
 * @returns the event, or null when it is not a known event
 */
export const toNoteEvent = (body: unknown): NoteEvent | null => {
  if (!isRecord(body) || typeof body.noteId !== "number") return null;
  if (body.type === NoteEventType.AccessChanged)
    return { type: NoteEventType.AccessChanged, noteId: body.noteId };
  if (body.type !== NoteEventType.NoteUpdated) return null;
  return {
    type: NoteEventType.NoteUpdated,
    noteId: body.noteId,
    title: typeof body.title === "string" ? body.title : "",
    content: typeof body.content === "string" ? body.content : "",
    updatedAt: parseApiDate(body.updatedAt) || Date.now(),
    ...(typeof body.editorId === "number" ? { editorId: body.editorId } : {}),
  };
};

/**
 * @param note - cached note
 * @param event - saved title/content
 * @returns the note with the saved values (same object if it is another note)
 */
export const withNoteUpdate = <T extends Note | undefined>(
  note: T,
  event: NoteUpdatedEvent,
): T =>
  note && note.id === event.noteId
    ? {
        ...note,
        title: event.title,
        content: event.content,
        updatedAt: event.updatedAt,
      }
    : note;

/**
 * @param notes - cached list
 * @param event - saved title/content
 * @returns the list with that note updated (same list when it is not there)
 */
export const withNoteUpdateInList = (
  notes: Note[] | undefined,
  event: NoteUpdatedEvent,
): Note[] | undefined =>
  notes?.some((note) => note.id === event.noteId)
    ? notes.map((note) => withNoteUpdate(note, event))
    : notes;
