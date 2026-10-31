import { useTags } from "@/features/notes/hooks/useTags";
import { useTagActions } from "@/features/notes/hooks/useTagActions";
import { useSetNoteTags } from "@/features/notes/hooks/useSetNoteTags";

// utils
import { findTagByName, pickTagColor } from "@/features/notes/utils";

// models
import type { Note, NoteCategory } from "@/features/notes/models";

import type { UseNoteTagEditorResult } from "./types";

/**
 * Tag editing of one note: toggle a tag, or create one (or reuse a same-
 * named tag) and add it. Ready to feed a TagSelector/TagPicker.
 * @param note - note to edit (null while there is none)
 * @returns tags, selection and actions
 */
function useNoteTagEditor(note: Note | null): UseNoteTagEditorResult {
  const { tags } = useTags();
  const { create } = useTagActions();
  const setNoteTags = useSetNoteTags();

  const categories = note?.categories ?? [];
  const selectedIds = categories.map((tag) => tag.id);

  const save = (next: NoteCategory[]) =>
    note && setNoteTags.mutate({ id: note.id, tags: next });

  const onToggle = (tag: NoteCategory) =>
    save(
      selectedIds.includes(tag.id)
        ? categories.filter((current) => current.id !== tag.id)
        : [...categories, tag],
    );

  const onCreate = (name: string) => {
    const existing = findTagByName(tags, name);
    if (existing) {
      if (!selectedIds.includes(existing.id)) onToggle(existing);
      return;
    }
    const color = pickTagColor(tags);
    create.mutate(
      { name, color },
      { onSuccess: (id) => save([...categories, { id, name, color }]) },
    );
  };

  return {
    tags,
    selectedIds,
    onToggle,
    onCreate,
    creating: create.isPending,
  };
}

export default useNoteTagEditor;
