import { useRef, useEffect, useMemo } from "react";

import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function PreviewNote({ id, title, content, last_update }) {
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef !== null && contentRef.current)
      contentRef.current.innerHTML = marked.parse(content);
  }, [contentRef, content]);

  const parsedLastDate = useMemo(() => {
    const date = new Date(last_update);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options);
  }, [last_update]);

  return (
    <div className="flex flex-col gap-3 bg-light-alter dark:bg-dark-alter p-5 rounded-xl card-shadow w-full">
      <div className="flex items-center justify-start gap-5">
        <FontAwesomeIcon
          icon={faNoteSticky}
          className="bg-secondary-default text-2xl py-3 px-[13px] rounded-full text-light-default"
        />
        <div>
          <h3>{title ?? "Nota sin título"}</h3>
          <p>{parsedLastDate}</p>
        </div>
      </div>
      <hr className="card-divider" />
      <div
        ref={contentRef}
        className="flex flex-col gap-2 max-h-[290px] overflow-hidden"
      />
    </div>
  );
}

export default PreviewNote;
