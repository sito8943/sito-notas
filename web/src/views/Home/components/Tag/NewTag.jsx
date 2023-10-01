import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFileUpload } from "@fortawesome/free-solid-svg-icons";

function NewTag({ onAddTag, onUploadTag }) {
  return (
    <div className="appear min-w-[300px] p-3 pt-10 flex items-center justify-center flex-col h-10">
      <p className="text-secondary">Nueva etiqueta</p>
      <div className="flex items-center justify-center">
        <button
          type="button"
          name="add-task"
          onClick={onAddTag}
          className="secondary icon-button"
          aria-label="click para agregar una nueva etiqueta"
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button
          type="button"
          name="upload-task"
          onClick={onUploadTag}
          className="secondary icon-button"
          aria-label="click para importar una etiqueta"
        >
          <FontAwesomeIcon icon={faFileUpload} />
        </button>
      </div>
    </div>
  );
}

export default NewTag;
