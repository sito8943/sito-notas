import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import useKeyShortcut from "./useKeyShortcut";

const press = (init: KeyboardEventInit = {}, target: EventTarget = window) => {
  const event = new KeyboardEvent("keydown", {
    key: "n",
    bubbles: true,
    cancelable: true,
    ...init,
  });
  target.dispatchEvent(event);
  return event;
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("useKeyShortcut", () => {
  it("passes the lowercase key and prevents the default when handled", () => {
    const handler = vi.fn(() => true);
    renderHook(() => useKeyShortcut(handler));
    const event = press({ key: "N", shiftKey: true });
    expect(handler).toHaveBeenCalledWith("n");
    expect(event.defaultPrevented).toBe(true);
  });

  it("keeps the default when the key is not a shortcut", () => {
    renderHook(() => useKeyShortcut(() => false));
    expect(press().defaultPrevented).toBe(false);
  });

  it("ignores key combos, held keys and handled events", () => {
    const handler = vi.fn(() => true);
    renderHook(() => useKeyShortcut(handler));
    press({ metaKey: true });
    press({ ctrlKey: true });
    press({ altKey: true });
    press({ repeat: true });
    window.addEventListener("keydown", (event) => event.preventDefault(), {
      capture: true,
      once: true,
    });
    press();
    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores typing in fields and keys while a dialog is open", () => {
    const handler = vi.fn(() => true);
    renderHook(() => useKeyShortcut(handler));
    document.body.innerHTML =
      '<input /><textarea></textarea><div contenteditable="true"><p></p></div>';
    press({}, document.querySelector("input")!);
    press({}, document.querySelector("textarea")!);
    press({}, document.querySelector("p")!);
    document.body.innerHTML = '<div role="dialog" aria-modal="true"></div>';
    press();
    expect(handler).not.toHaveBeenCalled();
  });

  it("does nothing while disabled or after unmount", () => {
    const handler = vi.fn(() => true);
    const { rerender, unmount } = renderHook(
      ({ enabled }) => useKeyShortcut(handler, enabled),
      { initialProps: { enabled: false } },
    );
    press();
    rerender({ enabled: true });
    unmount();
    press();
    expect(handler).not.toHaveBeenCalled();
  });
});
