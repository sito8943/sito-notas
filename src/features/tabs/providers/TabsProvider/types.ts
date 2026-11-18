import type { ReactNode } from "react";

import type { Tab } from "@/features/tabs/models";

export interface TabsProviderProps {
  /** Signed-in user: tabs are stored per user; without one they are not kept */
  userId?: number;
  children: ReactNode;
}

export interface TabsContextValue {
  /** Open tabs in display order */
  tabs: Tab[];
  /** Tab on screen */
  activeId: string;
  /** Opens `path` in a new tab after the current one and shows it */
  openTab: (path: string) => void;
  /** Shows a tab */
  activateTab: (id: string) => void;
  /** Shows the tab at a 1-based position (9 is the last) */
  activateTabAt: (position: number) => void;
  /** Shows the previous (-1) or next (1) tab, wrapping around */
  activateSiblingTab: (offset: number) => void;
  /** Closes a tab; the last one closed leaves the notes list open */
  closeTab: (id: string) => void;
}
