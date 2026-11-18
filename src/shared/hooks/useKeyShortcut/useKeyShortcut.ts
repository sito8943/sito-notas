import { useEffect, useRef } from "react";

import type { KeyShortcutHandler } from "./types";
import { isFreeShortcut } from "./utils";

/**
 * Listens for single-key shortcuts anywhere on the page, except while
 * typing in a field, with Ctrl/Cmd/Alt held or with a dialog open.
 * @param handler - gets the lowercase key; returns true when it handled it.
 * The latest one is always used.
 * @param enabled - listen only while true
 */
function useKeyShortcut(handler: KeyShortcutHandler, enabled = true) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFreeShortcut(event)) return;
      if (handlerRef.current(event.key.toLowerCase())) event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}

export default useKeyShortcut;
