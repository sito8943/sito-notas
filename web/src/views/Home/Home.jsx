import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-lodash-debounce";
import loadable from "@loadable/component";

import { v4 } from "uuid";

import { css } from "@emotion/css";

// components
import Masonry from "./components/Masonry/Masonry";
import Loading from "../../components/Loading/Loading";

// manager
import {
  updateNotesTags,
  removeNotesOfTag,
  createTask,
  initTasks,
  deleteTask,
} from "./components/Task/local";
import {
  initTags,
  deleteTag,
  createTag,
  updateTag,
  updateTagColor,
} from "./components/Tag/local";

// loadables
const ColorBox = loadable(() => import("./components/ColorBox/ColorBox"));

function Home() {
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const onAddTag = useCallback(() => {
    const realName = createTag(`Nueva etiqueta ${tags.length}`);
    setTags([...tags, realName]);
  }, [tags]);

  const [tagNameToDebounce, setTagNameToDebounce] = useState({});
  const debouncedValue = useDebounce(tagNameToDebounce, 500);

  useEffect(() => {
    if (tagNameToDebounce.newValue && tagNameToDebounce.oldValue) {
      const { newValue, oldValue } = tagNameToDebounce;
      const newTags = [...tags];
      // removing tag
      newTags.splice(newTags.indexOf(oldValue), 1, newValue);
      // updating notes of that tag
      const realName = updateTag(newValue, oldValue);
      updateNotesTags(realName, oldValue);
      setTasks(initTasks());
      setTags(newTags);
    }
  }, [debouncedValue]);

  const onChangeTag = (newValue, oldValue) =>
    setTagNameToDebounce({ newValue, oldValue });

  const [showColorBox, setShowBoxColor] = useState(undefined);
  const onBrushTag = (tag) => setShowBoxColor(tag);

  const setColorToTag = useCallback(
    (color) => {
      updateTagColor(showColorBox, color);
      setTags(initTags());
      setShowBoxColor(undefined);
    },
    [showColorBox]
  );

  const onDeleteTag = useCallback(
    (tag) => {
      const newTags = [...tags];
      // removing tag
      newTags.splice(
        newTags.findIndex((lTag) => lTag.id === tag),
        1
      );
      // removing notes of that tag
      removeNotesOfTag(tag);
      deleteTag(tag);
      setTasks(initTasks());
      setTags(newTags);
    },
    [tags]
  );

  const addTask = useCallback(
    (tag) => {
      const id = v4();
      createTask(id, tag);
      setTasks([...tasks, { id, tag }]);
    },
    [tasks]
  );

  const onDelete = useCallback(
    (id) => {
      const newTasks = [...tasks];
      newTasks.splice(
        newTasks.findIndex((task) => task.id === id),
        1
      );
      setTasks(newTasks);
      deleteTask(id);
    },
    [tasks]
  );

  useEffect(() => {
    if (tags.length) setTasks(initTasks());
  }, [tags]);

  useEffect(() => {
    setTags(initTags());
  }, []);

  return (
    <main className="main flex w-full p-5 mt-20 overflow-auto">
      {showColorBox ? (
        <ColorBox
          onColorSelect={(color) => setColorToTag(color)}
          onClose={() => setShowBoxColor(false)}
        />
      ) : null}
      <Masonry
        elements={tasks}
        tags={tags}
        onAdd={addTask}
        onAddTag={onAddTag}
        onDelete={onDelete}
        onBrushTag={onBrushTag}
        onDeleteTag={onDeleteTag}
        onChangeTag={onChangeTag}
      />
      {loading ? (
        <div
          className={`${
            loading ? "aGrow" : ""
          } grid fixed left-1 bottom-1 p-2 rounded-full bg-dark-background ${css(
            {
              gridTemplateColumns: "0.3fr 0fr",
              transition: "grid-template-columns 300ms ease",
              "&:hover": { gridTemplateColumns: "0.3fr 1fr" },
            }
          )}`}
        >
          <div className="w-10">
            <Loading className="w-10 h-10 rounded-full" />
          </div>
          <div className="overflow-hidden flex items-center">
            <p className="dark:text-white min-w-[110px]">Sincronizando</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Home;
