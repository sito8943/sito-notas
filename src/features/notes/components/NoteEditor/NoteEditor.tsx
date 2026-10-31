import { useEffect, useMemo, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { EditorToolbar } from "./EditorToolbar";
import type { NoteEditorProps } from "./types";
import { createEditorExtensions } from "./utils";
import "./styles.css";

/**
 * Formatted-text editor that reads and writes Markdown. Remount it (key)
 * to load another note; a new `content` for the same note (someone else
 * saved) replaces the document and keeps the cursor where it fits.
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

  useEffect(() => {
    if (!editor || editor.isDestroyed || content === editor.getMarkdown())
      return;
    const { from, to } = editor.state.selection;
    editor.commands.setContent(content, {
      contentType: "markdown",
      emitUpdate: false,
    });
    const end = editor.state.doc.content.size;
    editor.commands.setTextSelection({
      from: Math.min(from, end),
      to: Math.min(to, end),
    });
  }, [editor, content]);

  return (
    <div className="note-editor">
      {readOnly ? null : <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default NoteEditor;
