import type { UseMutationResult } from "@tanstack/react-query";

export interface UseNoteLinkResult {
  /** Token of the public link, null when the note has none */
  token: string | null;
  isLoading: boolean;
  create: UseMutationResult<string | null, Error, void>;
  remove: UseMutationResult<void, Error, void>;
}
