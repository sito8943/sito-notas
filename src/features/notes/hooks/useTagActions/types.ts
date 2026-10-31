import type { UseMutationResult } from "@tanstack/react-query";

import type { getTagsKey } from "@/features/notes/constants";

import type { CreateTagInput, UpdateTagInput } from "@/features/notes/services";

export interface UseTagActionsResult {
  /** Resolves with the new tag id */
  create: UseMutationResult<number, Error, CreateTagInput>;
  update: UseMutationResult<number, Error, UpdateTagInput>;
  /** Deletes tags for good; notes keep existing without them */
  remove: UseMutationResult<number, Error, number[]>;
}

export type TagsKey = ReturnType<typeof getTagsKey>;
