import { AppRoute } from "@/shared/routes";

/** Label of the tabs that show a page other than a note */
export const PAGE_TAB_LABEL_KEYS = {
  [AppRoute.Home]: "_pages:routes.home",
  [AppRoute.Shared]: "_pages:routes.shared",
  [AppRoute.Trash]: "_pages:routes.trash",
  [AppRoute.Tags]: "_pages:routes.tags",
  [AppRoute.Settings]: "_pages:routes.settings",
} as const;

/** Label of a note without title, or not in the notes list (shared, removed) */
export const NOTE_TAB_FALLBACK_KEY = "_pages:home.notes.untitled";
