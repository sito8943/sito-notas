import React, { useMemo } from "react";

// contexts
import { useSearch } from "../../../../../contexts/SearchProvider";

// components
import SideItem from "./SideItem";

// manager
import { getNote } from "../../Note/local";

function Sidebar({ notes, onAddNote, onDeleteNote }) {
  const { searchState } = useSearch();

  const cols = useMemo(() => {
    const lowerCased = searchState.toLowerCase();

    return notes
      .filter((note) => {
        const noteLowered = getNote(note).content.toLowerCase();
        return searchState.length
          ? stringSimilarity.compareTwoStrings(noteLowered, lowerCased) >
              0.25 || noteLowered.indexOf(lowerCased) >= 0
          : true;
      })
      .map((note) => <SideItem {...note} key={note.key} />);
  }, [searchState, notes]);

  return <aside className="w-[300px]">{cols}</aside>;
}

export default Sidebar;
