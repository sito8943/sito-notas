import type { SelectPlacementValue } from "@/shared/components/molecules/Select";

import type { SharePermissionValue } from "@/features/notes/models";

export interface SharePermissionSelectProps {
  value: SharePermissionValue;
  onChange: (permission: SharePermissionValue) => void;
  /** Accessible name */
  label: string;
  /** Where the list opens (bottom-end by default) */
  placement?: SelectPlacementValue;
  disabled?: boolean;
}
