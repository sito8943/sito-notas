import { isSafeLinkUrl } from "@/features/notes/components/NoteEditor/LinkDialog";

import { OPEN_LINK_FEATURES } from "./constants";

/**
 * @param event - mouse or keyboard event
 * @returns whether Ctrl (Windows/Linux) or Cmd (Mac) is held
 */
export const isModKey = (event: MouseEvent | KeyboardEvent): boolean =>
  event.metaKey || event.ctrlKey;

/**
 * Link the user clicked inside the editor, when it is safe to open.
 * @param target - click target
 * @param root - editor element (links outside it are ignored)
 * @returns the href, or null
 */
export const getClickedLinkHref = (
  target: EventTarget | null,
  root: HTMLElement,
): string | null => {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a[href]");
  if (!anchor || !root.contains(anchor)) return null;
  const href = anchor.getAttribute("href") ?? "";
  return isSafeLinkUrl(href) ? href : null;
};

/**
 * Opens a link in a new tab, isolated from the app.
 * @param href - safe URL
 */
export const openLink = (href: string) => {
  window.open(href, "_blank", OPEN_LINK_FEATURES);
};
