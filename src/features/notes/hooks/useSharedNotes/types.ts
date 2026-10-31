import type { Note } from "@/features/notes/models";

export interface UseSharedNotesResult {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
}
