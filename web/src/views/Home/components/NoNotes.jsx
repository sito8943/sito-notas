import React from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function NoNotes() {
  return (
    <div className="mt-2 appear w-full flex flex-col items-center justify-center gap-2">
      <FontAwesomeIcon
        className="text-dark-gray text-3xl"
        icon={faNoteSticky}
      />
      <p className="text-dark-gray">No hay notas</p>
    </div>
  );
}

export default NoNotes;
