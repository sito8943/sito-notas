import { flushSync } from "react-dom";

import { REDUCED_MOTION_QUERY } from "./constants";

/**
 * Runs a state update inside a View Transition, so elements with a
 * `view-transition-name` slide to their new place, fade in or fade out.
 * Without browser support or with reduced motion it just runs the update.
 * @param update - synchronous state change (flushed so the browser
 *   captures the new DOM)
 */
export const withViewTransition = (update: () => void) => {
  const canAnimate =
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function" &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches;
  if (!canAnimate) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
};
