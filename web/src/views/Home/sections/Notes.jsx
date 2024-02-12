import { useCallback, useEffect, useState } from "react";
import { sortBy } from "some-javascript-utils/array";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import stringSimilarity from "string-similarity";
import loadable from "@loadable/component";

// @sito/ui
import { useNotification } from "@sito/ui";

// providers
import { useUser } from "../../../providers/UserProvider";
import { useSearch } from "../../../providers/SearchProvider";

// services
import { createNote, fetchNotes, removeNote } from "../../../services/notes";

// components
import FAB from "../../../components/FAB/FAB";

// styles
import "./styles.css";

// lazy
const PreviewNote = loadable(() => import("../components/PreviewNote"));

function Notes({ setSync }) {
  const [error, setError] = useState(false);
  const { searchValue } = useSearch();
  const { userState, setUserState } = useUser();
  const { setNotification } = useNotification();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userState.notes) {
      setError(false);
      setLoading(true);
      fetchNotes().then(({ data, error }) => {
        if (error && error !== null) {
          setError(true);
          setNotification({ type: "error", message: error.message });
          console.error(error.message);
        } else setUserState({ type: "set-notes", notes: data });
        setLoading(false);
      });
    } else setLoading(false);
  }, [userState]);

  const addNote = async () => {
    setSync(true);
    const now = new Date().getTime();
    const newNote = {
      id: v4(),
      title: "Nueva nota",
      content: "",
      created_at: now,
      last_update: now,
    };
    setUserState({ type: "add-note", newNote });
    if (!userState.cached) {
      const { error } = await createNote(newNote);
      if (error && error !== null) {
        console.error(error.message);
        setNotification({ type: "error", message: error.message });
      }
    }
    setSync(false);
  };

  const onDelete = useCallback(
    async (id) => {
      const newNotesList = [...userState.notes];
      const found = newNotesList.findIndex((note) => note.id === id);
      if (found >= 0) {
        const deletedElement = newNotesList.splice(found, 1)[0].id;
        setUserState({ type: "set-notes", notes: newNotesList });
        const error = await removeNote(deletedElement);
        if (error && error !== null) console.error(error.message);
      }
    },
    [userState.notes]
  );

  const printNotes = useCallback(() => {
    let sorted = sortBy(userState.notes ?? [], "last_update", false);
    if (searchValue && searchValue.length)
      sorted = sorted.filter((note) => {
        if (!searchValue.length) return true;
        if (note.title) {
          if (
            stringSimilarity.compareTwoStrings(
              note.title.toLowerCase(),
              searchValue
            ) > 0.3
          )
            return true;
        } else if (note.content.toLowerCase().indexOf(searchValue) >= 0)
          return true;
        return false;
      });
    return sorted.map((note, i) => (
      <PreviewNote key={note.id} {...note} onDelete={onDelete} />
    ));
  }, [userState.notes, searchValue]);

  return (
    <section className="notes">
      {!error ? (
        <FAB
          onClick={addNote}
          position="bottom-right"
          icon={<FontAwesomeIcon icon={faAdd} />}
          color="secondary"
          className="z-10 text-3xl p-7"
        />
      ) : null}
      {loading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div
              key={skeleton}
              className="w-full h-[300px] skeleton-box !rounded-xl"
            />
          ))
        : printNotes()}
    </section>
  );
}

export default Notes;
