import { afterEach, describe, expect, it } from "vitest";

import { getClickedLinkHref, isModKey } from "./utils";

const mount = (html: string) => {
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.append(root);
  return root;
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("getClickedLinkHref", () => {
  it("returns the href of a clicked link, also from inner marks", () => {
    const root = mount('<p><a href="https://x.y"><strong>go</strong></a></p>');
    expect(getClickedLinkHref(root.querySelector("strong"), root)).toBe(
      "https://x.y",
    );
  });

  it("refuses unsafe protocols", () => {
    const root = mount('<a href="javascript:alert(1)">x</a>');
    expect(getClickedLinkHref(root.querySelector("a"), root)).toBeNull();
  });

  it("ignores text and links outside the editor", () => {
    const root = mount("<p>text</p>");
    const outside = mount('<a href="https://x.y">x</a>');
    expect(getClickedLinkHref(root.querySelector("p"), root)).toBeNull();
    expect(getClickedLinkHref(outside.querySelector("a"), root)).toBeNull();
  });
});

describe("isModKey", () => {
  it("accepts Ctrl or Cmd", () => {
    expect(isModKey(new MouseEvent("click", { metaKey: true }))).toBe(true);
    expect(isModKey(new MouseEvent("click", { ctrlKey: true }))).toBe(true);
    expect(isModKey(new MouseEvent("click"))).toBe(false);
  });
});
