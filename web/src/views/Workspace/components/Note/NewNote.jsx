import React from "react";

import { faAdd, faFileUpload } from "@fortawesome/free-solid-svg-icons";

// components
import IconButton from "../../../../components/IconButton/IconButton";

function NewNote({ onAddNote, onUploadNote }) {
  return (
    <div className="appear min-w-[300px] p-3 pt-10 flex items-center justify-center flex-col h-10">
      <p className="text-secondary">Nueva nota</p>
      <div className="flex items-center justify-center">
        <IconButton
          icon={faAdd}
          name="add-task"
          tooltip="Nueva nota"
          onClick={onAddNote}
          className="secondary icon-button"
          aria-label="click para agregar una nueva nota"
        />
        <IconButton
          name="upload-task"
          icon={faFileUpload}
          onClick={onUploadNote}
          tooltip="Importar nota"
          className="secondary icon-button"
          aria-label="click para importar una nota"
        />
      </div>
    </div>
  );
}

export default NewNote;
