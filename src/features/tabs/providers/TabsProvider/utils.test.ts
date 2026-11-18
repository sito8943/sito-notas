import { describe, expect, it } from "vitest";

import type { TabsState } from "@/features/tabs/models";

import {
  closeTab,
  createTabsState,
  getSiblingTab,
  getTabAtPosition,
  openTab,
  parseTabsState,
  restoreTabsState,
  syncActivePath,
} from "./utils";

const state: TabsState = {
  tabs: [
    { id: "a", path: "/" },
    { id: "b", path: "/note/1" },
    { id: "c", path: "/note/2" },
  ],
  activeId: "b",
};

describe("tabs state", () => {
  it("moves the tab on screen to the new page", () => {
    expect(syncActivePath(state, "/note/1")).toBe(state);
    expect(syncActivePath(state, "/trash").tabs[1].path).toBe("/trash");
  });

  it("opens a tab right after the one on screen and shows it", () => {
    const next = openTab(state, { id: "d", path: "/note/3" });
    expect(next.tabs.map((tab) => tab.id)).toEqual(["a", "b", "d", "c"]);
    expect(next.activeId).toBe("d");
  });

  it("closing the tab on screen shows its right, then left neighbour", () => {
    expect(closeTab(state, "b", "/").activeId).toBe("c");
    expect(closeTab({ ...state, activeId: "c" }, "c", "/").activeId).toBe("b");
    expect(closeTab(state, "a", "/").activeId).toBe("b");
  });

  it("keeps the only tab when it is already on the fallback page", () => {
    const home = createTabsState("/");
    expect(closeTab(home, home.activeId, "/")).toBe(home);
  });

  it("closing the only tab leaves a new one on the fallback page", () => {
    const next = closeTab(createTabsState("/note/1"), "x", "/");
    expect(next.tabs).toHaveLength(1);
    const only = createTabsState("/note/1");
    const after = closeTab(only, only.activeId, "/");
    expect(after.tabs.map((tab) => tab.path)).toEqual(["/"]);
    expect(after.activeId).not.toBe(only.activeId);
  });

  it("finds tabs by position (9 is the last) and wraps siblings", () => {
    expect(getTabAtPosition(state, 1)?.id).toBe("a");
    expect(getTabAtPosition(state, 5)).toBeUndefined();
    expect(getTabAtPosition(state, 9)?.id).toBe("c");
    expect(getSiblingTab(state, 1).id).toBe("c");
    expect(getSiblingTab({ ...state, activeId: "c" }, 1).id).toBe("a");
    expect(getSiblingTab({ ...state, activeId: "a" }, -1).id).toBe("c");
  });

  it("rejects invalid stored tabs", () => {
    expect(parseTabsState(state)).toEqual(state);
    expect(parseTabsState(null)).toBeNull();
    expect(parseTabsState({ tabs: [], activeId: "a" })).toBeNull();
    expect(parseTabsState({ ...state, activeId: "z" })).toBeNull();
    expect(
      parseTabsState({ tabs: [{ id: "a", path: "x" }], activeId: "a" }),
    ).toBeNull();
  });

  it("restores the stored tabs on the current page", () => {
    expect(restoreTabsState(state, "/note/2").activeId).toBe("c");
    const moved = restoreTabsState(state, "/tags");
    expect(moved.activeId).toBe("b");
    expect(moved.tabs[1].path).toBe("/tags");
    expect(restoreTabsState("junk", "/").tabs).toHaveLength(1);
  });
});
