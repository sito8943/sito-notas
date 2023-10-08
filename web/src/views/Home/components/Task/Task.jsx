import React, { memo, useState, useEffect, useCallback } from "react";
import loadable from "@loadable/component";

import PropTypes from "prop-types";

import {
  faEdit,
  faSave,
  faTrash,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";

// css
import { css } from "@emotion/css";

// manager
import { getTask, updateTask } from "./local";

// lazy load
const FloatingButton = loadable(() => import("../../../../components/FAB/FAB"));
const IconButton = loadable(() =>
  import("../../../../components/IconButton/IconButton")
);

const MDEditor = loadable(() => import("@uiw/react-md-editor"));
const MarkdownPreview = loadable(() => import("@uiw/react-markdown-preview"));

function Task({ id, onDelete, onSave }) {
  const [value, setValue] = useState(getTask(id)?.content);

  const onLocalDelete = () => {
    document.getElementById(id)?.classList.add("aShrink");
    setTimeout(() => {
      onDelete(id);
    }, 400);
  };

  const [editing, setEditing] = useState(false);

  const onDownload = () => {
    const taskToDownload = getTask(id);
    const data = "data:text/json;charset=utf-8,";
    const json = encodeURIComponent(JSON.stringify(taskToDownload));
    const filename = `task-${id}.json`;
    const link = document.createElement("a");
    link.setAttribute("href", data + json);
    link.setAttribute("download", filename);
    link.click();
    setTimeout(() => {
      link.remove();
    }, 400);
  };

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
  }, [editing, onLocalSave]);

  return (
    <article
      id={id}
      className={`group bg-primary shadow-md shadow-[black] rounded-sm min-h-[350px] w-full`}
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
          <IconButton
            type="button"
            name="edit-task"
            icon={editing ? faSave : faEdit}
            tooltip={editing ? "Guardar" : "Editar"}
            onClick={editing ? onLocalSave : onLocalEdit}
            ariaLabel="click para editar"
            className="text-secondary p-3 hover:text-primary hover:bg-sdark !rounded-0"
          />
          <IconButton
            type="button"
            name="download-task"
            onClick={onDownload}
            icon={faFileDownload}
            tooltip="Descargar nota"
            ariaLabel="click para borrar"
            className="text-secondary p-3 hover:text-primary hover:bg-sdark !rounded-0"
          />
          <IconButton
            type="button"
            icon={faTrash}
            tooltip="Eliminar"
            name="delete-task"
            onClick={onLocalDelete}
            ariaLabel="click para borrar"
            className="text-error p-3 hover:text-primary hover:bg-sdark !rounded-0"
          />
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
