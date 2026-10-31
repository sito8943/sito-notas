/** What a user a note is shared with may do with it */
export const SharePermission = {
  Read: "READ",
  Edit: "EDIT",
} as const;

export type SharePermissionValue =
  (typeof SharePermission)[keyof typeof SharePermission];

/** A user a note is shared with, as the owner sees it. Dates are epoch ms. */
export interface NoteShare {
  userId: number;
  email: string;
  username?: string;
  permission: SharePermissionValue;
  createdAt: number;
}
