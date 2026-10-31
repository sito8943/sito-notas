import type { NoteCategory } from "@/features/notes/models";

export type CreateTagInput = Pick<NoteCategory, "name" | "color">;

export type UpdateTagInput = Pick<NoteCategory, "id" | "name" | "color">;
