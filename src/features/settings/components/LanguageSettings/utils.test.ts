import { describe, expect, it } from "vitest";

import { toAppLanguage } from "./utils";

describe("toAppLanguage", () => {
  it("maps regional codes to the app language", () => {
    expect(toAppLanguage("es-ES")).toBe("es");
    expect(toAppLanguage("en")).toBe("en");
  });

  it("falls back to English for other or missing languages", () => {
    expect(toAppLanguage("fr")).toBe("en");
    expect(toAppLanguage(undefined)).toBe("en");
  });
});
