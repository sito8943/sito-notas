import { useTranslation } from "react-i18next";

// components
import { TagChip } from "@/features/notes/components/TagChip";
import { TagPicker } from "@/features/notes/components/TagPicker";

// hooks
import { useNoteTagEditor } from "@/features/notes/hooks/useNoteTagEditor";

import type { NoteTagsProps } from "./types";
import "./styles.css";

/** Tags of the open note: removable chips plus the picker to add/create */
function NoteTags({ note }: NoteTagsProps) {
  const { t } = useTranslation();
  const editor = useNoteTagEditor(note);

  return (
    <div className="note-tags" aria-label={t("_pages:routes.tags")}>
      {note.categories.map((tag) => (
        <TagChip
          key={tag.id}
          tag={tag}
          onRemove={() => editor.onToggle(tag)}
          removeLabel={t("_pages:tags.remove", { name: tag.name })}
        />
      ))}
      <TagPicker {...editor} />
    </div>
  );
}

export default NoteTags;
