import { memo, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// @sito/ui
import { IconButton, PrintAfter } from "@sito/ui";

import { marked } from "marked";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PreviewNote({ id, i, title, content, last_update, onDelete }) {
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef !== null && contentRef.current)
      contentRef.current.innerHTML = marked.parse(content.substring(0, 400));
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
      <div className="relative flex flex-col gap-3 bg-light-default dark:bg-dark-default p-5 rounded-xl card-shadow w-full transition hover:-translate-y-1 h-[400px]">
        <div className="flex items-center justify-between w-full">
          <Link
            to={`/note/${id}`}
            className="flex items-center justify-start gap-4"
          >
            <div>
              <h3>{title ?? "Nota sin título"}</h3>
              <p className="text-sm">{parsedLastDate}</p>
            </div>
          </Link>
          <IconButton
            icon={<FontAwesomeIcon icon={faTrash} />}
            className="primary"
            onClick={() => onDelete(i)}
          />
        </div>

        <hr className="card-divider" />
        <div
          ref={contentRef}
          className="flex flex-col gap-1 max-h-[300px] overflow-hidden"
        />
        <div className="card-overflow-background"></div>
      </div>
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
