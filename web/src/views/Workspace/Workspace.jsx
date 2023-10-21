import React, { useCallback, useEffect, useRef, useState } from "react";
import loadable from "@loadable/component";

import { v4 } from "uuid";

import { css } from "@emotion/css";

// components
import Loading from "../../components/Loading/Loading";

// contexts
import { useUser } from "../../contexts/UserProvider";

// manager
import {
  cleanNotes,
  createNote,
  initNotes,
  removeNote,
  saveOnLocal,
} from "./components/Note/local";
import {
  fetchNotes,
  createNote as createRemoteNote,
} from "../../services/notes";

// lazy load
const Masonry = loadable(() => import("./components/Masonry/Masonry"));

function Workspace() {
  const { userState } = useUser();

  const uploadFileRef = useRef(null);

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [uploadingWhat, setUploadingWhat] = useState("");

  const uploadNote = useCallback(() => {
    setUploadingWhat("note");
    setTimeout(() => {
      uploadFileRef.current.click();
    }, 200);
  }, [uploadFileRef]);

  const createLocalNote = (obj) => {
    try {
      const { id, content } = obj;
      createNote(id, content);
      setNotes(initNotes());
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = useCallback(
    (e) => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        const obj = JSON.parse(e.target.result);
        switch (uploadingWhat) {
          default: // note
            createLocalNote(obj);
            break;
        }
      };
    },
    [uploadingWhat]
  );

  const addNote = useCallback(async () => {
    const id = v4();
    const note = createNote(id);
    const error = await createRemoteNote(note);
    if (error !== null) console.error(error);
    syncNotes();
  }, []);

  const deleteNote = useCallback((id) => {
    removeNote(id);
    setNotes(initNotes());
  }, []);

  const syncNotes = async () => {
    try {
      const { data, error } = await fetchNotes();
      if (error !== null) {
        setNotes(initNotes());
        console.error(error);
      } else {
        const remoteNotes = data;
        saveOnLocal(remoteNotes);
        setNotes(initNotes());
      }
    } catch (err) {
      console.error(err);
      setNotes(initNotes());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userState.user) syncNotes();
    else cleanNotes();
  }, [userState]);

  return (
    <main className="main flex w-full p-5 mt-20 overflow-auto">
      {uploadingWhat.length ? (
        <input
          type="file"
          className="z-[-1] fixed"
          ref={uploadFileRef}
          onChange={uploadFile}
          accept="application/JSON"
        />
      ) : null}

      <Masonry
        notes={notes}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onUploadNote={uploadNote}
      />
      {loading ? (
        <div
          className={`${
            loading ? "aGrow" : ""
          } grid fixed left-1 bottom-1 p-2 rounded-full bg-dark-background ${css(
            {
              gridTemplateColumns: "0.3fr 0fr",
              transition: "grid-template-columns 300ms ease",
              "&:hover": { gridTemplateColumns: "0.3fr 1fr" },
            }
          )}`}
        >
          <div className="w-10">
            <Loading className="w-10 h-10 rounded-full" />
          </div>
          <div className="overflow-hidden flex items-center">
            <p className="dark:text-white min-w-[110px]">Sincronizando</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Workspace;
