import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// @sito/ui
import { useNotification, Loading } from "@sito/ui";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import { v4 } from "uuid";

import { css } from "@emotion/css";

// components
import Sidebar from "./components/Legacy/Sidebar/Sidebar";

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

// services
import {
  fetchNotes,
  createNote as createRemoteNote,
  removeNote as removeRemoteNote,
  updateNote as updateRemoteNote,
} from "../../services/notes";

/* // lazy load
const Masonry = loadable(() => import("./components/Masonry/Masonry"));
const Legacy = loadable(() => import("./components/Legacy/Legacy")); */

function Workspace() {
  const [sync, setSync] = useState(false);

  const { setNotification } = useNotification();

  const showError = (error) => {
    console.error(error);
    setNotification({ type: "error", message: String(error) });
  };

  const { userState } = useUser();

  const uploadFileRef = useRef(null);

  const [notes, setNotes] = useState([]);

  return (
    <div
      className={`flex w-full ${
        legacy ? "pl-0 pr-5" : "px-5"
      } mt-20 overflow-auto`}
    >
      <main className="main">
        <div
          className={`w-10 h-10 fixed bottom-1 left-1 transition-all duration-300 ease-in-out ${
            sync ? "scale-100" : "scale-0"
          } pointer-events-none`}
        >
          <Loading className="sync rounded-full" strokeWidth="8" />
        </div>
      </main>
    </div>
  );
}

export default Workspace;
