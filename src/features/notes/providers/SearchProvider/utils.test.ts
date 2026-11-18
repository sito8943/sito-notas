import { describe, expect, it } from "vitest";

import type { Note } from "@/features/notes/models";

import { matchesSearch, normalizeSearchText } from "./utils";

const note = (title: string, content: string): Note => ({
  id: 1,
  title,
  content,
  categories: [],
  favorite: false,
  createdAt: 0,
  updatedAt: 0,
});

describe("matchesSearch", () => {
  const recipe = note(
    "Receta",
    "## Ingredientes\n- Azúcar\n- [Harina integral](https://shop.example/flour)",
  );

  it("matches everything with an empty search", () => {
    expect(matchesSearch(recipe, "  ")).toBe(true);
  });

  it("finds words in the content, ignoring case and accents", () => {
    expect(matchesSearch(recipe, "azucar")).toBe(true);
    expect(matchesSearch(recipe, "INGREDIENTES")).toBe(true);
  });

  it("needs every word, in title or content, in any order", () => {
    expect(matchesSearch(recipe, "integral receta")).toBe(true);
    expect(matchesSearch(recipe, "integral chocolate")).toBe(false);
  });

  it("searches link text, not the link URL", () => {
    expect(matchesSearch(recipe, "harina")).toBe(true);
    expect(matchesSearch(recipe, "shop.example")).toBe(false);
  });

  it("still forgives typos in the title", () => {
    expect(matchesSearch(recipe, "recta")).toBe(true);
  });
});

describe("normalizeSearchText", () => {
  it("lowercases and drops accents", () => {
    expect(normalizeSearchText("Canción ÁRBOL")).toBe("cancion arbol");
  });
});
