import type { NoteShare } from "@/features/notes/models";

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
