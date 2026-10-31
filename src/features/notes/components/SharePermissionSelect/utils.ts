import {
  SharePermission,
  type SharePermissionValue,
} from "@/features/notes/models";

/**
 * @param value - value of the select
 * @returns the permission (read for anything unknown)
 */
export const toSharePermission = (value: string): SharePermissionValue =>
  value === SharePermission.Edit ? SharePermission.Edit : SharePermission.Read;
