import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { Note } from "@/features/notes/models";

export interface SearchContextValue {
  searchFunction: (note: Note) => boolean;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export interface SearchProviderProps {
  children: ReactNode;
}
