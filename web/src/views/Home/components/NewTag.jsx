import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function NewTag({ onAddTag }) {
  return (
    <div className="min-w-[300px] p-3 pt-10 flex items-center justify-center flex-col h-10">
      <p className="text-secondary">Nueva etiqueta</p>
      <button
        type="button"
        name="add-task"
        onClick={onAddTag}
        className="secondary icon-button"
        aria-label="click para agregar una nueva nota"
      >
        <FontAwesomeIcon icon={faAdd} />
      </button>
    </div>
  );
}

export default NewTag;
