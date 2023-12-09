import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "use-lodash-debounce";

// @sito/ui
import {
  Loading,
  InputControl,
  TextareaControl,
  useNotification,
} from "@sito/ui";

// services
import { fetchNotes, updateNote } from "../../services/notes";

// providers
import { useUser } from "../../providers/UserProvider";

// styles
import "./styles.css";

function Note() {
  const { id } = useParams();

  const [sync, setSync] = useState(false);

  const { userState, setUserState } = useUser();
  const { setNotification } = useNotification();

  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);

  const localFetchNotes = async (id) => {
    setLoading(true);
    if (!userState.notes) {
      const { data, error } = await fetchNotes();
      if (error && error !== null) {
        setNotification({ type: "error", message: error.message });
        console.error(error.message);
      }
      setUserState({ type: "set-notes", notes: data });
      const found = data.find((note) => note.id === id);
      if (found) setNote(found);
    } else {
      const found = userState.notes.find((note) => note.id === id);
      if (found) setNote(found);
    }
    setLoading(false);
  };

  useEffect(() => {
    localFetchNotes(id);
  }, [id]);

  const [toUpdate, setToUpdate] = useState(undefined);
  const debounced = useDebounce(toUpdate, 500);

  const handleContent = (e) => {
    setNote({ ...note, content: e.target.value });
    setToUpdate({ value: e.target.value, attribute: "content" });
  };

  const handleTitle = (e) => {
    setNote({ ...note, title: e.target.value });
    setToUpdate({ value: e.target.value, attribute: "title" });
  };

  const localUpdateNote = async (data) => {
    setSync(true);
    const foundIndex = userState.notes.findIndex((noteR) => noteR.id === id);
    if (foundIndex >= 0) {
      const now = new Date().getTime();
      const theNote = userState.notes[foundIndex];
      theNote.last_update = now;
      switch (data.attribute) {
        case "title":
          theNote.title = data.value;
          break;
        default:
          theNote.content = data.value;
          break;
      }
      await updateNote({ ...theNote, last_update: now });
    }
    setSync(false);
  };

  useEffect(() => {
    if (toUpdate) localUpdateNote(toUpdate);
  }, [debounced]);

  return (
    <main className="flex flex-col viewport">
      <div
        className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
          sync ? "scale-100" : "scale-0"
        } pointer-events-none`}
      >
        <Loading className="sync rounded-full" color="secondary" strokeWidth="8" />
      </div>
      <div className="p-10 sm:p-3 mt-20 !pb-10 grid workspace gap-5 flex-1 appear">
        {loading ? (
          <div className="w-full h-[45px] skeleton-box" />
        ) : (
          <InputControl
            value={note.title ?? ""}
            onChange={handleTitle}
            className="text-2xl"
          />
        )}
        {loading ? (
          <div className="w-full min-h-[300px] h-full skeleton-box !rounded-xl" />
        ) : (
          <TextareaControl
            label={""}
            value={note.content ?? ""}
            onChange={handleContent}
            className="min-h-[300px] h-full"
          />
        )}
      </div>
    </main>
  );
}

export default Note;
