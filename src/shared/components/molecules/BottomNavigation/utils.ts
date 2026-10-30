import type { BottomNavigationItemData } from "./types";

/**
 * @param items - bar items
 * @returns items left and right of the central action
 */
export const splitAroundAction = (items: BottomNavigationItemData[]) => {
  const middle = Math.ceil(items.length / 2);
  return { start: items.slice(0, middle), end: items.slice(middle) };
};
