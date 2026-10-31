import { useEffect, useMemo, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { EditorToolbar } from "./EditorToolbar";
import type { NoteEditorProps } from "./types";
import { createEditorExtensions } from "./utils";
import "./styles.css";

/**
 * Formatted-text editor that reads and writes Markdown. It reads `content`
 * once: remount it (key) to load another note.
 */
function NoteEditor(props: NoteEditorProps) {
  const { content, onChange, placeholder, label, readOnly = false } = props;

  // The editor keeps its first options: read the latest callback from a ref
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const extensions = useMemo(
    () => createEditorExtensions(placeholder),
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content,
    contentType: "markdown",
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: "note-editor-content",
        "aria-label": label,
        "aria-multiline": "true",
        "aria-readonly": String(readOnly),
        role: "textbox",
      },
    },
    onUpdate: ({ editor: current }) =>
      onChangeRef.current(current.getMarkdown()),
  });

  return (
    <div className="note-editor">
      {readOnly ? null : <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default NoteEditor;
