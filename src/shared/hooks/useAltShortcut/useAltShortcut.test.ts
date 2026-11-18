import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import useAltShortcut from "./useAltShortcut";

const press = (init: KeyboardEventInit = {}, target: EventTarget = window) => {
  const event = new KeyboardEvent("keydown", {
    key: "†",
    code: "KeyT",
    altKey: true,
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

describe("useAltShortcut", () => {
  it("passes the physical key and prevents the default when handled", () => {
    const handler = vi.fn(() => true);
    renderHook(() => useAltShortcut(handler));
    const event = press({ shiftKey: true });
    expect(handler).toHaveBeenCalledWith({
      code: "KeyT",
      shift: true,
      inField: false,
    });
    expect(event.defaultPrevented).toBe(true);
  });

  it("tells when the press comes from a text field", () => {
    const handler = vi.fn(() => false);
    renderHook(() => useAltShortcut(handler));
    document.body.innerHTML = "<textarea></textarea>";
    const event = press({}, document.querySelector("textarea")!);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ inField: true }),
    );
    expect(event.defaultPrevented).toBe(false);
  });

  it("ignores presses without Alt, with Ctrl/Cmd, held or in a dialog", () => {
    const handler = vi.fn(() => true);
    renderHook(() => useAltShortcut(handler));
    press({ altKey: false });
    press({ ctrlKey: true });
    press({ metaKey: true });
    press({ repeat: true });
    document.body.innerHTML = '<div role="dialog" aria-modal="true"></div>';
    press();
    expect(handler).not.toHaveBeenCalled();
  });
});
