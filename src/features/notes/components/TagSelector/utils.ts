import {
  findTagByName,
  normalizeTagName,
  toTagKey,
} from "@/features/notes/utils";
import type { NoteCategory } from "@/features/notes/models";

import type { TagSelectorOption } from "./types";

/**
 * Tags matching the query, plus "create" when no tag has that exact name
 * @param tags - every tag
 * @param query - what the user typed
 * @returns options in display order
 */
export const getTagSelectorOptions = (
  tags: NoteCategory[],
  query: string,
): TagSelectorOption[] => {
  const name = normalizeTagName(query);
  const key = toTagKey(name);
  const matches = tags
    .filter((tag) => !key || toTagKey(tag.name).includes(key))
    .map((tag): TagSelectorOption => ({ type: "tag", tag }));
  return name && !findTagByName(tags, name)
    ? [...matches, { type: "create", name }]
    : matches;
};
