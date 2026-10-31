import { Extension } from "@tiptap/react";

import { MoveDirection } from "./constants";
import { moveListItem } from "./utils";

/**
 * Alt/Option + Arrow Up/Down moves the current list or checklist item.
 * Outside a list, or at its first/last item, the keys keep their default.
 */
const MoveListItem = Extension.create({
  name: "moveListItem",

  addKeyboardShortcuts() {
    return {
      "Alt-ArrowUp": () =>
        moveListItem(
          this.editor.state,
          MoveDirection.Up,
          this.editor.view.dispatch,
        ),
      "Alt-ArrowDown": () =>
        moveListItem(
          this.editor.state,
          MoveDirection.Down,
          this.editor.view.dispatch,
        ),
    };
  },
});

export default MoveListItem;
