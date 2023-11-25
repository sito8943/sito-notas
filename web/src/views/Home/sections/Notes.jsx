import { useEffect, useState } from "react";
import { sortBy } from "some-javascript-utils/array";

// @sito/ui
import { useNotification } from "@sito/ui";

// providers
import { useUser } from "../../../providers/UserProvider";

// services
import { fetchNotes } from "../../../services/notes";

// components
import PreviewNote from "../components/PreviewNote";

// styles
import "./styles.css";

function Notes() {
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
    }
  }, [userState]);

  return (
    <section className="notes">
      {loading
        ? [1, 2, 3, 4, 5].map((skeleton) => (
            <div key={skeleton} className="w-full h-[300px] skeleton-box !rounded-xl" />
          ))
        : sortBy(userState.notes ?? [], "last_update").map((note, i) => (
            <PreviewNote key={note.id} i={i} {...note} />
          ))}
    </section>
  );
}

export default Notes;
