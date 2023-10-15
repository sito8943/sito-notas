import React, { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";

// @emotion/css
import { css } from "@emotion/css";

import {
  faAdd,
  faBrush,
  faFileDownload,
  faShareAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// utils
import { getTasksByTag } from "../Task/local";

// components
// lazy load
const ConfirmationModal = loadable(() =>
  import("../../../../components/ConfirmationModal/ConfirmationModal")
);
const NoNotes = loadable(() => import("./NoNotes"));
const Task = loadable(() => import("../Task/Task"));
const PrintAfter = loadable(() =>
  import("../../../../components/PrintAfter/PrintAfter")
);
const IconButton = loadable(() =>
  import("../../../../components/IconButton/IconButton")
);

// styles
import "./styles.css";

function Tag({
  tag,
  elements,
  onAdd,
  onDelete,
  onBrushTag,
  onChangeTag,
  onDeleteTag,
}) {
  const [deleted, setDeleted] = useState(false);
  const [confirmationToDelete, setConfirmationToDelete] = useState(false);

  const onDownload = () => {
    const data = "data:text/json;charset=utf-8,";
    const json = encodeURIComponent(
      JSON.stringify({ ...tag, tasks: getTasksByTag(tag.id) })
    );
    const filename = `${tag.id}.json`;
    const link = document.createElement("a");
    link.setAttribute("href", data + json);
    link.setAttribute("download", filename);
    link.click();
    setTimeout(() => {
      link.remove();
    }, 400);
  };

  const element = useMemo(() => {
    const filteredByTags = elements;
    if (filteredByTags.length)
      return filteredByTags.map((item) => (
        <li key={item.id}>
          <PrintAfter delay={150} animation="aGrow">
            <Task id={item.id} onDelete={onDelete} />
          </PrintAfter>
        </li>
      ));
    return <NoNotes />;
  }, [tag, elements, onAdd, onDelete, onBrushTag, onChangeTag, onDeleteTag]);

  const doDelete = useCallback(() => {
    setConfirmationToDelete(false);
    setDeleted(true);
    setTimeout(() => {
      onDeleteTag(tag.id);
    }, 450);
  }, [tag]);

  const onDeleteConfirmation = useCallback(() => {
    if (elements.length) setConfirmationToDelete(true);
    else doDelete();
  }, [elements]);

  return (
    <div
      key={tag.id}
      id={tag.id}
      className={`${
        deleted ? "disappear" : "appear"
      } min-w-[300px] max-w-[400px] border-dashed rounded-xl border-white-hover dark:border-dark-gray border-[1px] p-3 ${css(
        { background: `${tag.color}1c` }
      )}`}
    >
      {confirmationToDelete ? (
        <ConfirmationModal
          onAccept={doDelete}
          onClose={() => setConfirmationToDelete(false)}
          visible
        />
      ) : null}
      <div className="group flex flex-col">
        <h2
          contentEditable
          onInput={(e) => onChangeTag(e.target.innerText, tag.id)}
          className="text-2xl font-semibold text-sdark dark:text-secondary "
        >
          {tag.id}
        </h2>

        <div className="w-full grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
          <div className="overflow-hidden transition duration-300 opacity-0 group-hover:opacity-[1] items-center flex justify-center w-full">
            <div className="secondary dashed-border" />
            <IconButton
              icon={faAdd}
              name="add-task"
              tooltip="Agregar nota"
              onClick={() => onAdd(tag.id)}
              className="secondary icon-button"
              ariaLabel="click para agregar una nueva nota"
            />
            <IconButton
              type="button"
              name="share-tag"
              icon={faShareAlt}
              tooltip="Compartir"
              onClick={() => onShareTag(tag.id)}
              className=" text-primary hover:bg-pdark-hover icon-button"
              ariaLabel="click para compartir esta etiqueta con todas sus notas"
            />
            <IconButton
              type="button"
              icon={faBrush}
              name="brush-tag"
              tooltip="Colorear"
              onClick={() => onBrushTag(tag.id)}
              className="text-primary hover:bg-pdark-hover icon-button"
              ariaLabel="click para cambiar el color de esta etiqueta"
            />
            <IconButton
              type="button"
              name="download-tag"
              onClick={onDownload}
              tooltip="Descargar"
              icon={faFileDownload}
              className="text-primary hover:bg-pdark-hover icon-button"
              ariaLabel="click para descargar esta etiqueta con todas sus notas"
            />
            <IconButton
              type="button"
              icon={faTrash}
              name="delete-tag"
              tooltip="Eliminar"
              onClick={onDeleteConfirmation}
              className="text-error hover:bg-pdark-hover icon-button"
              ariaLabel="click para eliminar esta etiqueta con todas sus notas"
            />

            <div className="secondary dashed-border" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full mt-2 tag-content">
        {element}
      </div>
    </div>
  );
}

Tag.propTypes = {
  tag: PropTypes.shape({ id: PropTypes.string, color: PropTypes.string }),
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tag: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onBrushTag: PropTypes.func,
  onChangeTag: PropTypes.func,
  onDeleteTag: PropTypes.func,
};

const TagMemo = memo(
  (props) => <Tag {...props} />,
  (oldProps, newProps) => {
    return (
      oldProps.tag.id === newProps.tag.id &&
      oldProps.tag.color === newProps.tag.color &&
      oldProps.elements === newProps.elements &&
      oldProps.onAdd === newProps.onAdd &&
      oldProps.onDelete === newProps.onDelete &&
      oldProps.onBrushTag === newProps.onBrushTag &&
      oldProps.onChangeTag === newProps.onDeleteTag
    );
  }
);

export default TagMemo;
