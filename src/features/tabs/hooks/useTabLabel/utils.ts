import { matchPath } from "react-router-dom";

import { AppRoute } from "@/shared/routes";

import { PAGE_TAB_LABEL_KEYS } from "./constants";

/**
 * @param path - tab path (pathname + search)
 * @returns the note id when the tab shows a note
 */
export const getTabNoteId = (path: string): number | null => {
  const pathname = path.split("?")[0];
  const id = Number(matchPath(AppRoute.Note, pathname)?.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
};

/**
 * @param path - tab path (pathname + search)
 * @returns translation key of the page label (notes list for unknown pages)
 */
export const getPageTabLabelKey = (path: string): string => {
  const pathname = path.split("?")[0];
  const route = (Object.keys(PAGE_TAB_LABEL_KEYS) as AppRoute[]).find(
    (current) => matchPath(current, pathname) !== null,
  ) as keyof typeof PAGE_TAB_LABEL_KEYS | undefined;
  return PAGE_TAB_LABEL_KEYS[route ?? AppRoute.Home];
};
