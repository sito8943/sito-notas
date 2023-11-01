import React, { useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScreenWidth } from "use-screen-width";

import { sortBy } from "some-javascript-utils/array";
import { parseQueries } from "some-javascript-utils/browser";

import { faAdd } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useSearch } from "../../../../../contexts/SearchProvider";
import { useSidebar } from "../../../../../contexts/SidebarProvider";

// components
import SideItem from "./SideItem";
import IconButton from "../../../../../components/IconButton/IconButton";

// manager
import { getNote } from "../../Note/local";

// styles
import "./styles.css";

function Sidebar({ notes, onAddNote, onDeleteNote, onDownloadNote }) {
  const { searchState } = useSearch();

  const { sidebarState, setSidebarState } = useSidebar();
  const { screenWidth } = useScreenWidth();

  const navigate = useNavigate();
  const location = useLocation();

  const cols = useMemo(() => {
    const lowerCased = searchState.toLowerCase();

    return sortBy(
      notes.filter((note) => {
        const noteLowered = getNote(note).content.toLowerCase();
        return searchState.length
          ? stringSimilarity.compareTwoStrings(noteLowered, lowerCased) >
              0.25 || noteLowered.indexOf(lowerCased) >= 0
          : true;
      }),
      "created_at"
    ).map((note) => (
      <SideItem
        id={note}
        key={note}
        onDeleteNote={onDeleteNote}
        onDownloadNote={onDownloadNote}
      />
    ));
  }, [searchState, notes]);

  useEffect(() => {
    const { search } = location;
    const query = parseQueries(search);
    if (!query.note && notes.length) navigate(`/?note=${notes[0]}`);
  }, [location, notes]);

  useEffect(() => {
    setSidebarState(screenWidth > 840);
  }, [screenWidth]);

  return (
    <aside
      className={`sidebar ${
        sidebarState ? "!translate-x-[0]" : ""
      } py-5 min-w-[300px] w-[300px] bg-light-background2 dark:bg-dark-background2 flex flex-col justify-start items-start`}
    >
      <div className="px-3 mb-2 w-full flex justify-between">
        <h2 className="text-3xl font-bold text-sdark dark:text-slight">
          Mis notas
        </h2>
        <IconButton
          name="download-note"
          icon={faAdd}
          onClick={onAddNote}
          tooltip="Nueva nota"
          aria-label="click para agregar una nueva nota"
          className="group-hover:text-white text-secondary p-3 hover:text-primary hover:bg-sdark"
        />
      </div>
      <hr className="w-full border-sdark" />
      <ul className="w-full flex flex-col justify-start items-start">{cols}</ul>
    </aside>
  );
}

export default Sidebar;
