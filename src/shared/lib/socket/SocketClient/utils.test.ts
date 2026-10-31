import { describe, expect, it } from "vitest";

import { parseSocketBody, toSocketUrl } from "./utils";

describe("toSocketUrl", () => {
  it("swaps http(s) for ws(s) and appends the endpoint", () => {
    expect(toSocketUrl("https://api.notes.test", "https://x")).toBe(
      "wss://api.notes.test/ws",
    );
    expect(toSocketUrl("http://localhost:8083/", "http://x")).toBe(
      "ws://localhost:8083/ws",
    );
  });

  it("resolves a proxy path against the page origin", () => {
    expect(toSocketUrl("/proxy/api", "http://localhost:5173")).toBe(
      "ws://localhost:5173/proxy/api/ws",
    );
  });
});

describe("parseSocketBody", () => {
  it("parses JSON and returns null otherwise", () => {
    expect(parseSocketBody('{"a":1}')).toEqual({ a: 1 });
    expect(parseSocketBody("nope")).toBeNull();
  });
});
