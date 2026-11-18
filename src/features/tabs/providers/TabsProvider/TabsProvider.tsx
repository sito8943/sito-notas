import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// routes
import { AppRoute } from "@/shared/routes";

// lib
import { toLocal } from "@/shared/lib/storage";

import type { TabsState } from "@/features/tabs/models";

import { TabsContext } from "./TabsContext";
import type { TabsContextValue, TabsProviderProps } from "./types";
import {
  activateTab,
  closeTab,
  createTab,
  getActiveTab,
  getSiblingTab,
  getTabAtPosition,
  getTabsStorageKey,
  openTab,
  readStoredTabs,
  restoreTabsState,
  syncActivePath,
} from "./utils";

/**
 * Browser-like tabs over the app pages: the tab on screen follows the
 * router, other tabs remember their page. Stored per user.
 */
function TabsProvider(props: TabsProviderProps) {
  const { userId, children } = props;

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const path = `${pathname}${search}`;

  const storageKey = userId === undefined ? null : getTabsStorageKey(userId);
  const [state, setState] = useState(() =>
    restoreTabsState(storageKey ? readStoredTabs(storageKey) : undefined, path),
  );

  // Actions read the latest state without being recreated on every change
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Navigating inside the tab on screen changes its page
  useEffect(() => {
    setState((current) => syncActivePath(current, path));
  }, [path]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      toLocal(storageKey, state);
    } catch (error) {
      console.error(error);
    }
  }, [storageKey, state]);

  const actions = useMemo(() => {
    const show = (next: TabsState) => {
      const before = getActiveTab(stateRef.current);
      const after = getActiveTab(next);
      stateRef.current = next;
      setState(next);
      if (after.id !== before.id) navigate(after.path);
    };

    return {
      openTab: (target: string) =>
        show(openTab(stateRef.current, createTab(target))),
      activateTab: (id: string) => show(activateTab(stateRef.current, id)),
      activateTabAt: (position: number) => {
        const tab = getTabAtPosition(stateRef.current, position);
        if (tab) show(activateTab(stateRef.current, tab.id));
      },
      activateSiblingTab: (offset: number) => {
        const tab = getSiblingTab(stateRef.current, offset);
        show(activateTab(stateRef.current, tab.id));
      },
      closeTab: (id: string) =>
        show(closeTab(stateRef.current, id, AppRoute.Home)),
    };
  }, [navigate]);

  const value = useMemo<TabsContextValue>(
    () => ({ tabs: state.tabs, activeId: state.activeId, ...actions }),
    [state, actions],
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export default TabsProvider;
