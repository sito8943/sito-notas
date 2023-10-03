import React, { useCallback, useEffect, useRef, useState } from "react";
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
import config from "../../config";

// loadables
const ColorBox = loadable(() => import("./components/ColorBox/ColorBox"));

function Home() {
  const uploadFileRef = useRef(null);

  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);

  /* localStorage.removeItem(config.tags);
  localStorage.removeItem(config.tasks); */

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
      newTags[newTags.findIndex((tag) => tag.id === oldValue)].id = newValue;
      // updating notes of that tag
      const realName = updateTag(newValue, oldValue);
      console.log(realName);
      updateNotesTags(realName.id, oldValue);
      setTasks(initTasks());
      setTags(initTags());
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

  const [uploadingWhat, setUploadingWhat] = useState("");

  const onUploadTag = useCallback(() => {
    setUploadingWhat("tag");
    setTimeout(() => {
      uploadFileRef.current.click();
    }, 200);
  }, [uploadFileRef]);

  const createRemoteTag = (obj) => {
    try {
      const { id, tasks, color } = obj;
      createTag(id, color);
      tasks.forEach((task) => {
        const { id, tag, content } = task;
        createTask(id, tag, content);
      });
      setTags(initTags());
      setTasks(initTasks());
    } catch (err) {
      console.error(err);
    }
  };

  const onUploadFile = useCallback(
    (e) => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        const obj = JSON.parse(e.target.result);
        switch (uploadingWhat) {
          default: // tags
            createRemoteTag(obj);
            break;
        }
      };
    },
    [uploadingWhat]
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
      {uploadingWhat.length ? (
        <input
          type="file"
          className="z-[-1] fixed"
          ref={uploadFileRef}
          onChange={onUploadFile}
          accept="application/JSON"
        />
      ) : null}
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
        onUploadTag={onUploadTag}
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
