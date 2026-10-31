import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { Dialog } from "@sito/ui";

// components
import { TagSelector } from "@/features/notes/components/TagSelector";

// hooks
import { useNoteTagEditor } from "@/features/notes/hooks/useNoteTagEditor";

import type { NoteTagsDialogProps } from "./types";

/** "Add to tag" from a card: pick, unpick or create the note's tags */
function NoteTagsDialog({ note, onClose }: NoteTagsDialogProps) {
  const { t } = useTranslation();
  const editor = useNoteTagEditor(note);

  const title = note?.title || t("_pages:home.notes.untitled");

  return (
    <Dialog
      closeIcon={<FontAwesomeIcon icon={faXmark} />}
      open={note !== null}
      title={t("_pages:tags.dialogTitle", { title })}
      onClose={onClose}
      closeLabel={t("_accessibility:buttons.close")}
      closeOnBackdropClick
    >
      {note ? <TagSelector {...editor} /> : null}
    </Dialog>
  );
}

export default NoteTagsDialog;
