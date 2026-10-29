import { memo, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getNoteRoute } from "@/shared/routes";
import { useTranslation } from "react-i18next";

// @sito/ui
import { IconButton } from "@sito/ui";

import { marked } from "marked";

// icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PREVIEW_CONTENT_LENGTH, PREVIEW_DATE_FORMAT } from "./constants";
import type { PreviewNoteProps } from "./types";

function PreviewNote(props: PreviewNoteProps) {
  const { id, title, content, updatedAt, onDelete } = props;

  const { t } = useTranslation();

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerHTML = marked.parse(
        content.substring(0, PREVIEW_CONTENT_LENGTH),
        { async: false },
      );
  }, [contentRef, content]);

  const parsedLastDate = useMemo(() => {
    const date = new Date(updatedAt);
    return date.toLocaleDateString("en-US", PREVIEW_DATE_FORMAT);
  }, [updatedAt]);

  return (
    <div className="appear relative flex flex-col gap-3 bg-light-default dark:bg-dark-default p-5 rounded-xl card-shadow w-full transition hover:-translate-y-1 h-[400px]">
      <div className="flex items-center justify-between w-full">
        <Link
          to={getNoteRoute(id)}
          className="flex items-center justify-start gap-4"
        >
          <div>
            <h3>{title || "Nota sin título"}</h3>
            <p className="text-sm">{parsedLastDate}</p>
          </div>
        </Link>
        <IconButton
          icon={<FontAwesomeIcon icon={faTrash} />}
          color="primary"
          aria-label={t("_accessibility:buttons.remove")}
          onClick={() => onDelete(id)}
        />
      </div>

      <hr className="card-divider" />
      <div
        ref={contentRef}
        className="flex flex-col gap-1 max-h-[300px] overflow-hidden"
      />
      <div className="card-overflow-background"></div>
    </div>
  );
}

const PreviewNoteMemo = memo(
  (props: PreviewNoteProps) => <PreviewNote {...props} />,
  (oldProps, newProps) =>
    oldProps.id === newProps.id &&
    oldProps.content === newProps.content &&
    oldProps.title === newProps.title &&
    oldProps.updatedAt === newProps.updatedAt,
);

PreviewNoteMemo.displayName = "PreviewNote";

export default PreviewNoteMemo;
