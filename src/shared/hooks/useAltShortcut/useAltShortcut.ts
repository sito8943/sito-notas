import { useEffect, useRef } from "react";

import type { AltShortcutHandler } from "./types";
import { toAltShortcut } from "./utils";

/**
 * Listens for Option/Alt shortcuts anywhere on the page, text fields
 * included (the handler decides with `inField`); not while a dialog is open.
 * @param handler - returns true when it handled the press. The latest one
 * is always used.
 * @param enabled - listen only while true
 */
function useAltShortcut(handler: AltShortcutHandler, enabled = true) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut = toAltShortcut(event);
      if (shortcut && handlerRef.current(shortcut)) event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}

export default useAltShortcut;
