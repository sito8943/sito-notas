import { useTranslation } from "react-i18next";

// features
import { useCache } from "@/features/notes";

import { NOTE_TAB_FALLBACK_KEY } from "./constants";
import { getPageTabLabelKey, getTabNoteId } from "./utils";

/**
 * @param path - tab path
 * @returns what the tab shows: the note title or the page name
 */
function useTabLabel(path: string): string {
  const { t } = useTranslation();
  const { cache } = useCache();

  const noteId = getTabNoteId(path);
  if (noteId === null) return t(getPageTabLabelKey(path));

  const note = cache?.find((current) => current.id === noteId);
  return note?.title || t(NOTE_TAB_FALLBACK_KEY);
}

export default useTabLabel;
