import { describe, expect, it } from "vitest";

import { ThemeMode } from "./constants";
import { resolveMode } from "./utils";

describe("resolveMode", () => {
  it("keeps an explicit theme", () => {
    expect(resolveMode(ThemeMode.Light, true)).toBe(ThemeMode.Light);
    expect(resolveMode(ThemeMode.Dark, false)).toBe(ThemeMode.Dark);
  });

  it("follows the device for System", () => {
    expect(resolveMode(ThemeMode.System, true)).toBe(ThemeMode.Dark);
    expect(resolveMode(ThemeMode.System, false)).toBe(ThemeMode.Light);
  });
});
