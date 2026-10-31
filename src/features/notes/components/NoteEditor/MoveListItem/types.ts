import type { EditorState, Transaction } from "@tiptap/pm/state";

import type { MoveDirection } from "./constants";

export type MoveDirection = (typeof MoveDirection)[keyof typeof MoveDirection];

/** ProseMirror command shape: applies when dispatch is given, always reports if it can */
export type MoveListItemCommand = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
) => boolean;
