import type { ViewportSpace } from "./types";

/**
 * Nearest ancestor that clips its content (overflow other than visible).
 * @param element - starting element
 * @returns clipping ancestor, or null when only the viewport clips
 */
export function getClippingAncestor(element: HTMLElement): HTMLElement | null {
  let current = element.parentElement;
  while (current && current !== document.body) {
    if (getComputedStyle(current).overflowY !== "visible") return current;
    current = current.parentElement;
  }
  return null;
}

/**
 * Room above and below an element that is actually visible: inside the
 * visual viewport (which excludes the on-screen keyboard, unlike
 * window.innerHeight on iOS) and inside its scroll container.
 * @param element - anchor element
 * @returns free px above and below it
 */
export function measureViewportSpace(element: HTMLElement): ViewportSpace {
  const rect = element.getBoundingClientRect();
  const viewport = window.visualViewport;
  let top = viewport?.offsetTop ?? 0;
  let bottom = top + (viewport?.height ?? window.innerHeight);

  const clip = getClippingAncestor(element)?.getBoundingClientRect();
  if (clip) {
    top = Math.max(top, clip.top);
    bottom = Math.min(bottom, clip.bottom);
  }

  return {
    above: Math.max(0, rect.top - top),
    below: Math.max(0, bottom - rect.bottom),
  };
}
