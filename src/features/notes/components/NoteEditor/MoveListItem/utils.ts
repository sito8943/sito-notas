import { Fragment } from "@tiptap/pm/model";
import { TextSelection } from "@tiptap/pm/state";
import type { EditorState, Transaction } from "@tiptap/pm/state";

import { MOVABLE_LIST_ITEMS, MoveDirection } from "./constants";
import type { MoveDirection as Direction } from "./types";

/**
 * Swaps the list item holding the cursor with its sibling above or below.
 * The item moves with its nested items and the cursor stays in its text.
 * @param state - editor state
 * @param direction - up or down
 * @param dispatch - applies the change; omit to only check
 * @returns false when there is nothing to move (not in a list, first/last item)
 */
export const moveListItem = (
  state: EditorState,
  direction: Direction,
  dispatch?: (tr: Transaction) => void,
): boolean => {
  const { selection } = state;
  if (!(selection instanceof TextSelection)) return false;

  const { $from, from, to } = selection;

  // Innermost list item around the cursor
  let depth = $from.depth;
  while (depth > 0 && !MOVABLE_LIST_ITEMS.includes($from.node(depth).type.name))
    depth--;
  if (depth === 0) return false;

  const item = $from.node(depth);
  const list = $from.node(depth - 1);
  const index = $from.index(depth - 1);
  const itemStart = $from.before(depth);
  const itemEnd = $from.after(depth);

  // A selection reaching other items is not a single item
  if (to > itemEnd) return false;

  const up = direction === MoveDirection.Up;
  const siblingIndex = up ? index - 1 : index + 1;
  if (siblingIndex < 0 || siblingIndex >= list.childCount) return false;

  if (!dispatch) return true;

  const sibling = list.child(siblingIndex);
  const start = up ? itemStart - sibling.nodeSize : itemStart;
  const end = up ? itemEnd : itemEnd + sibling.nodeSize;
  const offset = up ? -sibling.nodeSize : sibling.nodeSize;

  const tr = state.tr.replaceWith(
    start,
    end,
    Fragment.from(up ? [item, sibling] : [sibling, item]),
  );
  tr.setSelection(TextSelection.create(tr.doc, from + offset, to + offset));
  dispatch(tr.scrollIntoView());
  return true;
};
