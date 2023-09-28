import React, { memo, useMemo, useState, useEffect, useCallback } from "react";

import PropTypes from "prop-types";

import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

// css
import { css } from "@emotion/css";

// components
import FloatingButton from "../../../../components/FAB/FAB";

// manager
import { getTask, updateTask } from "./local";

function Task({ id, onDelete }) {
  const [color, setColor] = useState("primary");

  const [value, setValue] = useState(getTask(id)?.content);

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
    return () => {
      document
        .getElementById(`${id}[!]title`)
        ?.removeEventListener("input", update);
    };
  }, [id]);

  const onLocalDelete = () => {
    document.getElementById(id)?.classList.add("aShrink");
    setTimeout(() => {
      onDelete(id);
    }, 400);
  };

  const [editing, setEditing] = useState(false);

  const onLocalEdit = () => setEditing(true);

  const onLocalSave = useCallback(() => {
    updateTask(id, "content", value);
    setEditing(false);
  }, [value, id]);

  const onEscapePress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onLocalSave();
        e.target.blur();
      }
    },
    [onLocalSave]
  );

  useEffect(() => {
    window.addEventListener("keydown", onEscapePress);
    const fullscreenButton = document.querySelectorAll(
      '[data-name="fullscreen"]'
    )[0];
    if (fullscreenButton)
      fullscreenButton.addEventListener("click", onLocalSave);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
      const fullscreenButton = document.querySelectorAll(
        '[data-name="fullscreen"]'
      )[0];
      if (fullscreenButton)
        fullscreenButton.removeEventListener("click", onLocalSave);
    };
  }, [editing]);

  return (
    <article
      id={id}
      className={`group ${bgColor} shadow-md shadow-[black] rounded-sm min-h-[350px] w-full`}
    >
      {editing ? (
        <FloatingButton
          icon={faSave}
          onClick={onLocalSave}
          className="primary !fixed z-[999999]"
        />
      ) : null}
      <div
        className={`grid ${css({
          transition: "all 500ms ease",
          gridTemplateRows: "0fr",
        })} group-hover:grid-rows-[1fr] ${
          editing ? "!grid-rows-[1fr]" : ""
        } pointer-events-none group-hover:pointer-events-auto`}
      >
        <div className="flex overflow-hidden bg-dark-drawer-background w-full justify-end">
          <button
            type="button"
            name="edit-task"
            onClick={editing ? onLocalSave : onLocalEdit}
            aria-label="click para editar"
            className="text-secondary p-3 hover:text-primary hover:bg-sdark"
          >
            <FontAwesomeIcon icon={editing ? faSave : faEdit} />
          </button>
          <button
            type="button"
            name="delete-task"
            onClick={onLocalDelete}
            aria-label="click para borrar"
            className="text-error p-3 hover:text-primary hover:bg-sdark"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="mt-2">
          {!editing ? (
            <MarkdownPreview
              source={value}
              className={`w-full ${css({
                backgroundColor: "initial",
                color: "#222",
              })}`}
            />
          ) : (
            <MDEditor value={value} onChange={setValue} fullscreen />
          )}
        </div>
      </div>
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