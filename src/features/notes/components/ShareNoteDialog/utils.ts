import type { NoteShare } from "@/features/notes/models";

import type { SharedNoteSummary } from "./types";

/**
 * @param share - user the note is shared with
 * @returns name to show: username, else the email
 */
export const getShareName = (share: NoteShare): string =>
  share.username || share.email;

/**
 * @param share - user the note is shared with
 * @returns one uppercase letter for the avatar
 */
export const getShareInitial = (share: NoteShare): string =>
  getShareName(share).charAt(0).toUpperCase();

/**
 * @param a - note shown by the dialog
 * @param b - note received
 * @returns whether both show the same id, title and content
 */
export const isSameNoteSummary = (
  a: SharedNoteSummary | null,
  b: SharedNoteSummary | null,
): boolean =>
  a?.id === b?.id && a?.title === b?.title && a?.content === b?.content;
