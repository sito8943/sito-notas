import type { Note, SharePermissionValue } from "@/features/notes/models";

export type CreateNoteInput = Pick<Note, "title" | "content">;

export type UpdateNoteInput = Pick<Note, "id" | "title" | "content">;

export type SetFavoriteInput = Pick<Note, "id" | "favorite">;

export interface SetNoteTagsInput {
  id: number;
  /** Every tag the note keeps ([] removes them all) */
  tagIds: number[];
}

export interface ShareNoteInput {
  noteId: number;
  /** Email of a Sito Notas user */
  email: string;
  permission: SharePermissionValue;
}

export interface SetSharePermissionInput {
  noteId: number;
  userId: number;
  permission: SharePermissionValue;
}

export interface UnshareNoteInput {
  noteId: number;
  userId: number;
}
