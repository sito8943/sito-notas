import { useIsMutating } from "@tanstack/react-query";

// routes
import { getNoteRoute } from "@/shared/routes";

// lib
import { isApplePlatform } from "@/shared/lib/hotkeys";

// hooks
import { useAltShortcut } from "@/shared/hooks/useAltShortcut";

// features
import { ADD_NOTE_MUTATION_KEY, useAddNote } from "@/features/notes";
import { useTabs } from "@/features/tabs/providers/TabsProvider";

import { TabShortcutCode } from "./constants";
import { getDigitPosition } from "./utils";

/**
 * Option/Alt tab shortcuts: T new note in a new tab and W close the tab,
 * from anywhere (text fields included). 1-9 go to a tab (9: the last); on
 * macOS not in text fields, where Option + number types characters (@, #…
 * on Spanish keyboards). Shift + ← / → go to the previous / next tab
 * outside text fields (inside they select words).
 * @returns the action of T, for the new tab button
 */
function useTabShortcuts() {
  const { activeId, openTab, closeTab, activateTabAt, activateSiblingTab } =
    useTabs();

  const addNote = useAddNote({ onCreated: (id) => openTab(getNoteRoute(id)) });
  const isAdding = useIsMutating({ mutationKey: ADD_NOTE_MUTATION_KEY }) > 0;
  const newTab = () => {
    if (!isAdding) addNote.mutate();
  };

  useAltShortcut(({ code, shift, inField }) => {
    if (shift) {
      if (inField) return false;
      if (code === TabShortcutCode.Previous) activateSiblingTab(-1);
      else if (code === TabShortcutCode.Next) activateSiblingTab(1);
      else return false;
      return true;
    }
    if (code === TabShortcutCode.New) newTab();
    else if (code === TabShortcutCode.Close) closeTab(activeId);
    else {
      const position = getDigitPosition(code);
      if (position === null || (inField && isApplePlatform())) return false;
      activateTabAt(position);
    }
    return true;
  });

  return { newTab, isAdding };
}

export default useTabShortcuts;
