import type { UseMutationResult } from "@tanstack/react-query";

import type { Note } from "@/features/notes/models";

export interface UseTrashResult {
  /** Trashed notes, most recently deleted first */
  notes: Note[];
  isLoading: boolean;
  /** Takes notes out of the trash (ids) */
  restore: UseMutationResult<number, Error, number[]>;
  /** Deletes trashed notes for good (ids) */
  removePermanently: UseMutationResult<number, Error, number[]>;
}
