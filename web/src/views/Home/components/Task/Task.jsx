import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// css
import { css } from "@emotion/css";

// manager
import { getTask, updateTask } from "./local";

function Task({ id, onDelete }) {
  const [color, setColor] = useState("primary");

  const bgColor = useMemo(() => {
    switch (color) {
      case "primary":
        return "bg-primary text-dark-background2";
      case "secondary":
        return "bg-primary";
      default: // any color
        return `bg-[${color}]`;
    }
  }, [color]);

  const data = useMemo(() => {
    return getTask(id);
  }, [id]);

  const update = useCallback(
    (e) => {
      const { innerText } = e.target;
      const [, key] = e.target.id.split("[!]");
      updateTask(id, key, innerText);
    },
    [id]
  );

  useEffect(() => {
    document.getElementById(`${id}[!]title`)?.addEventListener("input", update);
    document
      .getElementById(`${id}[!]content`)
      ?.addEventListener("input", update);

    return () => {
      document
        .getElementById(`${id}[!]title`)
        ?.removeEventListener("input", update);
      document
        .getElementById(`${id}[!]content`)
        ?.removeEventListener("input", update);
    };
  }, [id]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onResizeWindow = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResizeWindow);
    return () => {
      window.removeEventListener("resize", onResizeWindow);
    };
  }, []);

  return (
    <article
      id={id}
      className={`group ${bgColor} p-5 rounded-xl min-h-[150px] min-w-[216px] max-w-[${windowWidth}]`}
    >
      <div className="flex items-center justify-between w-full gap-4">
        <h3
          id={`${id}[!]title`}
          contentEditable
          className={`text-xl font-semibold ${css({
            maxWidth: `calc(${windowWidth}px - 80px)`,
          })}`}
        >
          {data?.title}
        </h3>
        <button
          type="button"
          name="delete-task"
          onClick={() => onDelete(id)}
          aria-label="click to delete task"
          className="pointer-events-none opacity-0 group-hover:opacity-[1] group-hover:pointer-events-auto secondary icon-button"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <p
        id={`${id}[!]content`}
        contentEditable
        className={css({ maxWidth: `calc(${windowWidth}px - 80px)` })}
      >
        {data?.content}
      </p>
    </article>
  );
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
};

const TaskMemo = memo(
  ({ id, onDelete }) => <Task id={id} onDelete={onDelete} />,
  (oldProps, newProps) => {
    return (
      oldProps.id === newProps.id && oldProps.onDelete === newProps.onDelete
    );
  }
);

TaskMemo.displayName = "Task";

export default TaskMemo;
