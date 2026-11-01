import { useEffect, useState, type RefObject } from "react";

import type { ViewportSpace } from "./types";
import { measureViewportSpace } from "./utils";

/**
 * Tracks the free room above and below an element while active, updating
 * when the on-screen keyboard opens/closes or anything scrolls.
 * @param ref - anchor element
 * @param active - measure only while true (e.g. a popover is open)
 * @returns free px above and below, null while inactive
 */
function useViewportSpace(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
): ViewportSpace | null {
  const [space, setSpace] = useState<ViewportSpace | null>(null);

  useEffect(() => {
    if (!active) {
      setSpace(null);
      return;
    }
    const update = () => {
      if (ref.current) setSpace(measureViewportSpace(ref.current));
    };
    update();
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    // Capture: also hears inner scroll containers (the note body)
    window.addEventListener("scroll", update, true);
    return () => {
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [ref, active]);

  return space;
}

export default useViewportSpace;
