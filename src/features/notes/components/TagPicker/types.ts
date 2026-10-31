import type { TagSelectorProps } from "@/features/notes/components/TagSelector";

export type TagPickerProps = Omit<
  TagSelectorProps,
  "onEscape" | "className"
> & {
  disabled?: boolean;
};
