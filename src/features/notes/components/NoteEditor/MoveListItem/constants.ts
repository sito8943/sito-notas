/** Where a list item moves */
export const MoveDirection = {
  Up: "up",
  Down: "down",
} as const;

/** Nodes that can be reordered: bullet/ordered items and checklist items */
export const MOVABLE_LIST_ITEMS: readonly string[] = ["listItem", "taskItem"];
