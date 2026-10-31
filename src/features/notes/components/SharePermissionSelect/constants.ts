import { SharePermission } from "@/features/notes/models";

/** Options in display order, with their i18n label keys */
export const SHARE_PERMISSION_OPTIONS = [
  { value: SharePermission.Read, labelKey: "_pages:share.permission.read" },
  { value: SharePermission.Edit, labelKey: "_pages:share.permission.edit" },
] as const;
