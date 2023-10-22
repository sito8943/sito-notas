import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { parseQueries } from "some-javascript-utils/browser";

// font awesome
import { faFileDownload, faTrash } from "@fortawesome/free-solid-svg-icons";

// manager
import { getNote } from "../../Note/local";

// components
import IconButton from "../../../../../components/IconButton/IconButton";

function SideItem({ id, onDelete, onDownload }) {
  const location = useLocation();

  const startNote = useMemo(() => {
    return getNote(id).content.split("\n")[0].replace("#", "");
  }, [id]);

  const selected = useMemo(() => {
    const { search } = location;
    const query = parseQueries(search);
    return query.note && id === query.note;
  }, [location]);

  return (
    <li
      className={`flex items-center justify-between appear group w-full relative text-sdark dark:text-slight  ${
        selected
          ? "bg-dark-background !text-white"
          : "hover:!text-white hover:bg-secondary"
      }`}
    >
      <Link className="w-full p-3" to={`/?note=${id}`}>
        <h3 className="text-2xl font-light">{startNote}</h3>
      </Link>
      <div className="flex gap-1">
        <IconButton
          name="download-note"
          icon={faFileDownload}
          onClick={onDownload}
          tooltip="Descargar nota"
          aria-label="click para descargar"
          className={` ${
            selected ? "" : "group-hover:text-white"
          } text-secondary p-3 hover:text-primary hover:bg-sdark`}
        />
        <IconButton
          name="delete-note"
          icon={faTrash}
          tooltip="Eliminar"
          onClick={onDelete}
          aria-label="click para borrar"
          className="text-error p-3 hover:text-primary hover:bg-sdark"
        />
      </div>
    </li>
  );
}

export default SideItem;
