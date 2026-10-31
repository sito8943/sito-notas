import type { SharePermissionValue } from "@/features/notes/models";

export interface SharePermissionSelectProps {
  value: SharePermissionValue;
  onChange: (permission: SharePermissionValue) => void;
  /** Accessible name */
  label: string;
  disabled?: boolean;
}
