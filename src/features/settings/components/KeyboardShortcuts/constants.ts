import { NOTE_SHORTCUTS, getEditorShortcuts } from "@/features/notes";
import { TAB_SHORTCUTS } from "@/features/tabs";

import type { ShortcutGroup } from "./types";

/** Shortcuts listed in Settings, by where they work */
export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    titleKey: "_pages:settings.sections.shortcuts.groups.notes",
    shortcuts: [...NOTE_SHORTCUTS],
  },
  {
    titleKey: "_pages:settings.sections.shortcuts.groups.tabs",
    shortcuts: [...TAB_SHORTCUTS],
  },
  {
    titleKey: "_pages:settings.sections.shortcuts.groups.editor",
    shortcuts: getEditorShortcuts(),
  },
];
