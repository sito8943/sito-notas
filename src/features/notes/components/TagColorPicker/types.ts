export interface TagColorPickerProps {
  value: string | undefined;
  onChange: (color: string) => void;
  /** Accessible name of the color group */
  label: string;
  disabled?: boolean;
}
