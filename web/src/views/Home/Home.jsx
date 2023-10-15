import React, { useCallback, useEffect, useRef, useState } from "react";
import loadable from "@loadable/component";

import { v4 } from "uuid";

import { css } from "@emotion/css";

// components
import Loading from "../../components/Loading/Loading";

// manager
import { createNote, initNotes, removeNote } from "./components/Note/local";

// lazy load
const Masonry = loadable(() => import("./components/Masonry/Masonry"));

function Home() {
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

  const createRemoteNote = (obj) => {
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
            createRemoteNote(obj);
            break;
        }
      };
    },
    [uploadingWhat]
  );

  const addNote = useCallback(() => {
    const id = v4();
    createNote(id);
    setNotes(initNotes());
  }, []);

  const deleteNote = useCallback((id) => {
    removeNote(id);
    setNotes(initNotes());
  }, []);

  useEffect(() => {
    setNotes(initNotes());
  }, []);

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

export default Home;
