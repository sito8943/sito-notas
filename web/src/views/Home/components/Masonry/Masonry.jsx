import React, { useMemo } from "react";
import stringSimilarity from "string-similarity";

// components
import Note from "../Note/Note";
import NewNote from "../Note/NewNote";

// contexts
import { useSearch } from "../../../../contexts/SearchProvider";

// local
import { getNote } from "../Note/local";

function Masonry({ notes, onDeleteNote, onAddNote, onUploadNote, onSaveNote }) {
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
      .map((note) => (
        <Note id={note} key={note} onSave={onSaveNote} onDelete={onDeleteNote} />
      ));
  }, [searchState, notes, onDeleteNote, onAddNote, onUploadNote]);

  return (
    <ul className="flex w-full gap-2">
      {cols}
      <NewNote onAddNote={onAddNote} onUploadNote={onUploadNote} />
    </ul>
  );
}

export default Masonry;
