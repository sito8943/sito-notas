import { useTranslation } from "react-i18next";

// @sito/ui
import { Dialog, DialogActions } from "@sito/ui";

// constants
import { TRASH_RETENTION_DAYS } from "@/features/notes/constants";

import type { RemoveNoteDialogProps } from "./types";
import "./styles.css";

/** Asks before moving a note to the trash */
function RemoveNoteDialog(props: RemoveNoteDialogProps) {
  const { open, onConfirm, onClose, isLoading = false } = props;

  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      title={t("_pages:trash.confirm.title")}
      onClose={onClose}
      closeLabel={t("_accessibility:buttons.close")}
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <p className="remove-note-dialog-description">
        {t("_pages:trash.confirm.description", { days: TRASH_RETENTION_DAYS })}
      </p>
      <DialogActions
        alignEnd
        primaryText={t("_pages:trash.confirm.submit")}
        cancelText={t("_pages:trash.confirm.cancel")}
        onPrimaryClick={onConfirm}
        onCancel={onClose}
        isLoading={isLoading}
        disabled={isLoading}
        primaryProps={{ color: "error", variant: "submit" }}
      />
    </Dialog>
  );
}

export default RemoveNoteDialog;
