import { fromLocalObject } from "@/shared/lib/storage";
import type { Tab, TabsState } from "@/features/tabs/models";

import { MAX_TAB_POSITION, TABS_STORAGE_PREFIX } from "./constants";

/**
 * @param path - page of the tab
 * @returns a new tab with a unique id
 */
export const createTab = (path: string): Tab => ({
  id: crypto.randomUUID(),
  path,
});

/**
 * @param path - page of the only tab
 * @returns state with one tab, on screen
 */
export const createTabsState = (path: string): TabsState => {
  const tab = createTab(path);
  return { tabs: [tab], activeId: tab.id };
};

/**
 * @param state - tabs
 * @returns the tab on screen
 */
export const getActiveTab = (state: TabsState): Tab =>
  state.tabs.find((tab) => tab.id === state.activeId) ?? state.tabs[0];

/**
 * Navigation inside the tab on screen changes its page.
 * @param state - tabs
 * @param path - current page
 * @returns the same state when nothing changed
 */
export const syncActivePath = (state: TabsState, path: string): TabsState => {
  const active = getActiveTab(state);
  if (active.path === path) return state;
  return {
    ...state,
    tabs: state.tabs.map((tab) =>
      tab.id === active.id ? { ...tab, path } : tab,
    ),
  };
};

/**
 * Adds a tab right after the one on screen and shows it.
 * @param state - tabs
 * @param tab - new tab
 * @returns new state
 */
export const openTab = (state: TabsState, tab: Tab): TabsState => {
  const index = state.tabs.findIndex(({ id }) => id === state.activeId);
  const tabs = [...state.tabs];
  tabs.splice(index + 1, 0, tab);
  return { tabs, activeId: tab.id };
};

/**
 * @param state - tabs
 * @param id - tab to show
 * @returns new state (the same one for an unknown id)
 */
export const activateTab = (state: TabsState, id: string): TabsState =>
  state.tabs.some((tab) => tab.id === id) ? { ...state, activeId: id } : state;

/**
 * Removes a tab. Closing the one on screen shows its right neighbour (or
 * the left one when it was last). The only tab is not closed unless it is
 * off `fallbackPath`: then it is replaced by one on it.
 * @param state - tabs
 * @param id - tab to close
 * @param fallbackPath - page of the tab left when all are closed
 * @returns new state
 */
export const closeTab = (
  state: TabsState,
  id: string,
  fallbackPath: string,
): TabsState => {
  const index = state.tabs.findIndex((tab) => tab.id === id);
  if (index === -1) return state;
  const tabs = state.tabs.filter((tab) => tab.id !== id);
  if (tabs.length === 0)
    return state.tabs[0].path === fallbackPath
      ? state
      : createTabsState(fallbackPath);
  if (id !== state.activeId) return { ...state, tabs };
  const next = tabs[Math.min(index, tabs.length - 1)];
  return { tabs, activeId: next.id };
};

/**
 * @param state - tabs
 * @param position - 1-based; the last position (9) is always the last tab
 * @returns the tab at that position, if any
 */
export const getTabAtPosition = (
  state: TabsState,
  position: number,
): Tab | undefined =>
  position === MAX_TAB_POSITION
    ? state.tabs[state.tabs.length - 1]
    : state.tabs[position - 1];

/**
 * @param state - tabs
 * @param offset - -1 previous, 1 next; wraps around the ends
 * @returns the neighbour of the tab on screen
 */
export const getSiblingTab = (state: TabsState, offset: number): Tab => {
  const index = state.tabs.findIndex((tab) => tab.id === state.activeId);
  const count = state.tabs.length;
  return state.tabs[(((index + offset) % count) + count) % count];
};

/**
 * @param userId - signed-in user
 * @returns localStorage key of that user's tabs
 */
export const getTabsStorageKey = (userId: number): string =>
  `${TABS_STORAGE_PREFIX}:${userId}`;

const isTab = (value: unknown): value is Tab =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as Tab).id === "string" &&
  typeof (value as Tab).path === "string" &&
  (value as Tab).path.startsWith("/");

/**
 * Validates tabs read from storage.
 * @param value - parsed JSON
 * @returns the tabs, or null when the value is not a valid state
 */
export const parseTabsState = (value: unknown): TabsState | null => {
  if (typeof value !== "object" || value === null) return null;
  const { tabs, activeId } = value as Partial<TabsState>;
  if (!Array.isArray(tabs) || tabs.length === 0 || !tabs.every(isTab))
    return null;
  if (!tabs.some((tab) => tab.id === activeId)) return null;
  return { tabs, activeId: activeId as string };
};

/**
 * Tabs to start with: the stored ones showing the current page (a tab
 * already on it, or else the last active tab moves to it), or one new tab.
 * @param stored - stored value, if any
 * @param path - current page
 * @returns initial state
 */
export const restoreTabsState = (stored: unknown, path: string): TabsState => {
  const state = parseTabsState(stored);
  if (!state) return createTabsState(path);
  const existing = state.tabs.find((tab) => tab.path === path);
  if (existing) return { ...state, activeId: existing.id };
  return syncActivePath(state, path);
};

/**
 * @param key - storage key
 * @returns the stored value, or undefined when missing, unreadable or blocked
 */
export const readStoredTabs = (key: string): unknown => {
  try {
    return fromLocalObject<unknown>(key);
  } catch {
    return undefined;
  }
};
