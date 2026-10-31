// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { Dialog, DialogActions } from "@sito/ui";

import type { ConfirmDialogProps } from "./types";
import "./styles.css";

/** Asks the user to confirm an action */
function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    closeLabel,
    onConfirm,
    onClose,
    isLoading = false,
    danger = false,
  } = props;

  return (
    <Dialog
      closeIcon={<FontAwesomeIcon icon={faXmark} />}
      open={open}
      title={title}
      onClose={onClose}
      closeLabel={closeLabel}
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <p className="confirm-dialog-description">{description}</p>
      <DialogActions
        alignEnd
        primaryText={confirmText}
        cancelText={cancelText}
        onPrimaryClick={onConfirm}
        onCancel={onClose}
        isLoading={isLoading}
        disabled={isLoading}
        primaryProps={{
          color: danger ? "error" : "primary",
          variant: "submit",
        }}
      />
    </Dialog>
  );
}

export default ConfirmDialog;
