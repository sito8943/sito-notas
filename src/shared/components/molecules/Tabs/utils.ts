import { TAB_SCROLL_MARGIN_PX } from "./constants";

/**
 * Scrolls the tab list sideways just enough to show the whole tab. Only
 * the list moves (scrollIntoView would also scroll the page vertically).
 * @param list - scrollable tab list
 * @param tab - tab to reveal
 */
export function revealTab(list: HTMLElement, tab: HTMLElement) {
  const listRect = list.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();

  let delta = 0;
  if (tabRect.left < listRect.left)
    delta = tabRect.left - listRect.left - TAB_SCROLL_MARGIN_PX;
  else if (tabRect.right > listRect.right)
    delta = tabRect.right - listRect.right + TAB_SCROLL_MARGIN_PX;

  if (delta !== 0) list.scrollBy({ left: delta, behavior: "smooth" });
}
