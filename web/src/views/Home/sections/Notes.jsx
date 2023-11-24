import { useEffect, useState, useCallback } from "react";
import { sortBy } from "some-javascript-utils/array";

// @sito/ui
import { useNotification } from "@sito/ui";

// providers
import { useUser } from "../../../providers/UserProvider";

// services
import { fetchNotes } from "../../../services/notes";

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

  return <section className=""></section>;
}

export default Notes;
