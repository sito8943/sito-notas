import { SIDEBAR_STORAGE_KEY } from "./constants";

/** Stored choice, expanded by default */
export const readStoredOpen = (): boolean => {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) return stored === "true";
  } catch {
    // storage unavailable (private mode): fall back to the default
  }
  return true;
};

export const storeOpen = (open: boolean): void => {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  } catch {
    // storage unavailable (private mode): keep the in-memory state only
  }
};
