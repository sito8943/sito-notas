import { useEffect, useState } from "react";
import { sortBy } from "some-javascript-utils/array";
import { v4 } from "uuid";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { useNotification } from "@sito/ui";

// providers
import { useUser } from "../../../providers/UserProvider";

// services
import { createNote, fetchNotes } from "../../../services/notes";

// components
import FAB from "../../../components/FAB/FAB";
import PreviewNote from "../components/PreviewNote";

// styles
import "./styles.css";

function Notes({ setSync }) {
  const { userState, setUserState } = useUser();
  const { setNotification } = useNotification();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userState.notes) {
      setLoading(true);
      fetchNotes().then(({ data, error }) => {
        if (error && error !== null) {
          setNotification({ type: "error", message: error.message });
          console.error(error.message);
        }
        setUserState({ type: "set-notes", notes: data });
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

  return (
    <section className="notes">
      <FAB
        onClick={addNote}
        position="bottom-right"
        icon={faAdd}
        className="submit z-10"
      />
      {loading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div
              key={skeleton}
              className="w-full h-[300px] skeleton-box !rounded-xl"
            />
          ))
        : sortBy(userState.notes ?? [], "last_update", false).map((note, i) => (
            <PreviewNote key={note.id} i={i} {...note} />
          ))}
    </section>
  );
}

export default Notes;
