export interface RemoveNoteDialogProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  /** The note is being moved */
  isLoading?: boolean;
}
