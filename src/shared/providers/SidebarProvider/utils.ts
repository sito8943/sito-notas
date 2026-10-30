import { SIDEBAR_OVERLAY_QUERY, SIDEBAR_STORAGE_KEY } from "./constants";

/** Stored choice, else expanded on wide screens and collapsed on small ones */
export const readStoredOpen = (): boolean => {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) return stored === "true";
  } catch {
    // storage unavailable (private mode): fall back to the screen size
  }
  return !window.matchMedia(SIDEBAR_OVERLAY_QUERY).matches;
};

export const storeOpen = (open: boolean): void => {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  } catch {
    // storage unavailable (private mode): keep the in-memory state only
  }
};
