import type { Note } from "@/features/notes/models";

export type CreateNoteInput = Pick<Note, "title" | "content">;

export type UpdateNoteInput = Pick<Note, "id" | "title" | "content">;

export type SetFavoriteInput = Pick<Note, "id" | "favorite">;
