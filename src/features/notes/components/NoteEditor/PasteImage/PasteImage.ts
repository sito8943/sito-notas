import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import type { PasteImageOptions } from "./types";
import { getImageFiles } from "./utils";

/**
 * Pasted or dropped images are uploaded and inserted as image blocks
 * (Markdown `![](url)`), in order, where they were pasted or dropped.
 */
const PasteImage = Extension.create<PasteImageOptions>({
  name: "pasteImage",

  addOptions() {
    return { getUploader: () => undefined };
  },

  addProseMirrorPlugins() {
    const { editor, options } = this;

    const insert = async (files: File[], at: number) => {
      const upload = options.getUploader();
      if (!upload) return;
      let pos = at;
      for (const file of files) {
        const src = await upload(file);
        if (!src || editor.isDestroyed) continue;
        pos = Math.min(pos, editor.state.doc.content.size);
        editor
          .chain()
          .insertContentAt(pos, { type: "image", attrs: { src, alt: "" } })
          .run();
        pos = editor.state.selection.to;
      }
    };

    // Takes the event when it carries images and uploads are allowed
    const handle = (event: ClipboardEvent | DragEvent, at: number) => {
      const data =
        "clipboardData" in event ? event.clipboardData : event.dataTransfer;
      const files = getImageFiles(data);
      if (!files.length || !options.getUploader()) return false;
      event.preventDefault();
      void insert(files, at);
      return true;
    };

    return [
      new Plugin({
        key: new PluginKey("pasteImage"),
        props: {
          handlePaste: (view, event) =>
            handle(event, view.state.selection.from),
          handleDrop: (view, event, _slice, moved) => {
            if (moved) return false;
            const coords = { left: event.clientX, top: event.clientY };
            const at =
              view.posAtCoords(coords)?.pos ?? view.state.selection.from;
            return handle(event, at);
          },
        },
      }),
    ];
  },
});

export default PasteImage;
