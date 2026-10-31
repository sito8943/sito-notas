import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import useEscapeKey from "./useEscapeKey";

const press = (init: KeyboardEventInit = {}) =>
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", cancelable: true, ...init }),
  );

afterEach(() => {
  document.body.innerHTML = "";
});

describe("useEscapeKey", () => {
  it("runs the handler on Escape", () => {
    const handler = vi.fn();
    renderHook(() => useEscapeKey(handler));
    press();
    expect(handler).toHaveBeenCalledOnce();
  });

  it("ignores other keys and key combos", () => {
    const handler = vi.fn();
    renderHook(() => useEscapeKey(handler));
    press({ key: "Enter" });
    press({ metaKey: true });
    expect(handler).not.toHaveBeenCalled();
  });

  it("leaves Escape to an open dialog", () => {
    const handler = vi.fn();
    renderHook(() => useEscapeKey(handler));
    document.body.innerHTML = '<div role="dialog" aria-modal="true"></div>';
    press();
    expect(handler).not.toHaveBeenCalled();
  });

  it("does nothing while disabled or after unmount", () => {
    const handler = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ enabled }) => useEscapeKey(handler, enabled),
      { initialProps: { enabled: false } },
    );
    press();
    rerender({ enabled: true });
    unmount();
    press();
    expect(handler).not.toHaveBeenCalled();
  });
});
