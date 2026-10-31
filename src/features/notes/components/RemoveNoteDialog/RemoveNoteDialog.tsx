import { useTranslation } from "react-i18next";

// components
import { ConfirmDialog } from "@/shared/components/organisms/ConfirmDialog";

// constants
import { TRASH_RETENTION_DAYS } from "@/features/notes/constants";

import type { RemoveNoteDialogProps } from "./types";

/** Asks before moving a note to the trash */
function RemoveNoteDialog(props: RemoveNoteDialogProps) {
  const { open, onConfirm, onClose, isLoading = false } = props;

  const { t } = useTranslation();

  return (
    <ConfirmDialog
      open={open}
      title={t("_pages:trash.confirm.title")}
      description={t("_pages:trash.confirm.description", {
        days: TRASH_RETENTION_DAYS,
      })}
      confirmText={t("_pages:trash.confirm.submit")}
      cancelText={t("_pages:trash.confirm.cancel")}
      closeLabel={t("_accessibility:buttons.close")}
      onConfirm={onConfirm}
      onClose={onClose}
      isLoading={isLoading}
      danger
    />
  );
}

export default RemoveNoteDialog;
