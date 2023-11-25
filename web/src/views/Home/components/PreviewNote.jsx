import { memo, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// @sito/ui
import { PrintAfter } from "@sito/ui";

import { marked } from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function PreviewNote({ id, i, title, content, last_update }) {
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
    <PrintAfter animation="appear" delay={i * 100}>
      <Link
        to={`/note/${id}`}
        className="flex flex-col gap-3 bg-light-alter dark:bg-dark-alter p-5 rounded-xl card-shadow w-full transition hover:-translate-y-1"
      >
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
          className="flex flex-col gap-1 max-h-[300px] overflow-hidden"
        />
      </Link>
    </PrintAfter>
  );
}

const PreviewNoteMemo = memo(
  (props) => <PreviewNote {...props} />,
  (oldProps, newProps) =>
    oldProps.id === newProps.id &&
    oldProps.i === newProps.i &&
    oldProps.content === newProps.content &&
    oldProps.last_update === newProps.last_update
);

PreviewNoteMemo.displayName = "PreviewNote";

export default PreviewNoteMemo;
