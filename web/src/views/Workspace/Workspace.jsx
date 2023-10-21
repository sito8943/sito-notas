import React, { useCallback, useEffect, useRef, useState } from "react";
import loadable from "@loadable/component";

import { v4 } from "uuid";

import { css } from "@emotion/css";

// components
import Loading from "../../components/Loading/Loading";

// contexts
import { useNotification } from "../../contexts/NotificationProvider";
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
  removeNote as removeRemoteNote,
} from "../../services/notes";

// lazy load
const Masonry = loadable(() => import("./components/Masonry/Masonry"));

function Workspace() {
  const { setNotificationState } = useNotification();

  const showNotification = useCallback(
    (ntype, message) =>
      setNotificationState({
        type: "set",
        ntype,
        message,
      }),
    [setNotificationState]
  );

  const showError = (error) => {
    console.error(error);
    showNotification("error", String(error));
  };

  const { userState } = useUser();

  const uploadFileRef = useRef(null);

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

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
    if (error !== null) showError(error);
    syncNotes();
  }, []);

  const deleteNote = useCallback(async (id) => {
    const error = await removeRemoteNote(id);
    if (error !== null) {
      removeNote(id);
      showError(error);
    }
    setNotes(initNotes());
  }, []);

  const syncNotes = async () => {
    setLoading(true);
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
      <div
        className={`${
          loading ? "aGrow" : "aShrink  opacity-0 pointer-events-none"
        } transition-all duration-500 grid fixed left-1 bottom-1 p-2 rounded-full dark:bg-dark-background bg-light-background ${css(
          {
            gridTemplateColumns: "0.3fr 0fr",
            transition: "all 300ms ease",
            "&:hover": { gridTemplateColumns: "0.3fr 1fr" },
          }
        )}`}
      >
        <div className="w-10">
          <Loading
            className="w-10 h-10 rounded-full"
            loaderClass="!w-[30px]"
            strokeWidth="6"
          />
        </div>
        <div className="overflow-hidden flex items-center">
          <p className="dark:text-white min-w-[110px] pr-2">Sincronizando</p>
        </div>
      </div>
    </main>
  );
}

export default Workspace;
