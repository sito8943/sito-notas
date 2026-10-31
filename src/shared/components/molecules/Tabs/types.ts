export interface TabData<T extends string | number> {
  value: T;
  label: string;
  /** Badge after the label (e.g. how many items the tab shows); 0 hides it */
  count?: number;
  /** Shown but not selectable (e.g. nothing to show) */
  disabled?: boolean;
}

export interface TabsProps<T extends string | number> {
  tabs: TabData<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the tab list */
  label: string;
  className?: string;
}
