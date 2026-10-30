export interface TabData<T extends string | number> {
  value: T;
  label: string;
}

export interface TabsProps<T extends string | number> {
  tabs: TabData<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the tab list */
  label: string;
  className?: string;
}
