import React from "react";

import { faAdd, faFileUpload } from "@fortawesome/free-solid-svg-icons";

// components
import IconButton from "../../../../components/IconButton/IconButton";

function NewTag({ onAddTag, onUploadTag }) {
  return (
    <div className="appear min-w-[300px] p-3 pt-10 flex items-center justify-center flex-col h-10">
      <p className="text-secondary">Nueva etiqueta</p>
      <div className="flex items-center justify-center">
        <IconButton
          type="button"
          icon={faAdd}
          name="add-task"
          tooltip="Nueva etiqueta"
          onClick={onAddTag}
          className="secondary icon-button"
          ariaLabel="click para agregar una nueva etiqueta"
        />
        <IconButton
          type="button"
          name="upload-task"
          icon={faFileUpload}
          onClick={onUploadTag}
          tooltip="Importar nota"
          className="secondary icon-button"
          ariaLabel="click para importar una etiqueta"
        />
      </div>
    </div>
  );
}

export default NewTag;
