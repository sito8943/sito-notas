import type { UseMutationResult } from "@tanstack/react-query";

import type { NoteShare, SharePermissionValue } from "@/features/notes/models";

export interface UseNoteSharesResult {
  shares: NoteShare[];
  isLoading: boolean;
  /** i18n key of the load error, if any */
  loadErrorKey: string | null;
  /** Shares the note with the user that has this email */
  add: UseMutationResult<NoteShare, Error, AddShareVariables>;
  /** Changes what a user may do with the note */
  changePermission: UseMutationResult<
    NoteShare,
    Error,
    ChangePermissionVariables,
    RemoveShareContext
  >;
  /** Stops sharing with this user id */
  remove: UseMutationResult<number, Error, number, RemoveShareContext>;
  /** i18n key of the last "add" error, if any */
  addErrorKey: string | null;
}

export interface AddShareVariables {
  email: string;
  permission: SharePermissionValue;
}

export interface ChangePermissionVariables {
  userId: number;
  permission: SharePermissionValue;
}

/** Shares before an optimistic change, to roll back */
export interface RemoveShareContext {
  previous?: NoteShare[];
}
