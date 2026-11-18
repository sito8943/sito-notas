/** One open tab: a page of the app (notes list, a note…) */
export interface Tab {
  id: string;
  /** Path shown in the tab (pathname + search) */
  path: string;
}

/** Open tabs in display order and the one on screen */
export interface TabsState {
  tabs: Tab[];
  activeId: string;
}
