import type { ShortcutInfo } from "@/shared/lib/hotkeys";

export interface ShortcutGroup {
  /** Translation key of the group title */
  titleKey: string;
  shortcuts: ShortcutInfo[];
}
