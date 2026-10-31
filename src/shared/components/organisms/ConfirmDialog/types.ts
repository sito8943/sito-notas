export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  /** Text of the close (X) button for screen readers */
  closeLabel: string;
  onConfirm: () => void;
  onClose: () => void;
  /** The action is running: buttons disabled, no dismiss */
  isLoading?: boolean;
  /** Destructive action: red confirm button */
  danger?: boolean;
}
