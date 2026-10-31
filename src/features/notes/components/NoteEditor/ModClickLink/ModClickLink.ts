import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import { MOD_PRESSED_CLASS } from "./constants";
import { getClickedLinkHref, isModKey, openLink } from "./utils";

/**
 * Ctrl+click (Cmd+click on Mac) opens a link in a new tab. A plain click
 * still places the cursor to edit it. While the key is held, links show a
 * pointer.
 */
const ModClickLink = Extension.create({
  name: "modClickLink",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("modClickLink"),
        props: {
          handleClick: (view, _pos, event) => {
            if (!isModKey(event)) return false;
            const href = getClickedLinkHref(event.target, view.dom);
            if (!href) return false;
            event.preventDefault();
            openLink(href);
            return true;
          },
        },
        view: (view) => {
          const toggle = (pressed: boolean) =>
            view.dom.classList.toggle(MOD_PRESSED_CLASS, pressed);
          const onKey = (event: KeyboardEvent) => toggle(isModKey(event));
          const onBlur = () => toggle(false);

          window.addEventListener("keydown", onKey);
          window.addEventListener("keyup", onKey);
          window.addEventListener("blur", onBlur);
          return {
            destroy: () => {
              window.removeEventListener("keydown", onKey);
              window.removeEventListener("keyup", onKey);
              window.removeEventListener("blur", onBlur);
            },
          };
        },
      }),
    ];
  },
});

export default ModClickLink;
