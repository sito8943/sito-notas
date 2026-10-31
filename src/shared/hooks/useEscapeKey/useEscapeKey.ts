import { useEffect, useRef } from "react";

import { isFreeEscape } from "./utils";

/**
 * Runs `handler` when Escape is pressed anywhere on the page, unless a
 * dialog or menu is open (they close first).
 * @param handler - action for Escape; the latest one is always used
 * @param enabled - listen only while true
 */
function useEscapeKey(handler: () => void, enabled = true) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFreeEscape(event)) return;
      event.preventDefault();
      handlerRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}

export default useEscapeKey;
