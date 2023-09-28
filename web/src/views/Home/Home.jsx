import React, { useCallback, useEffect, useState } from "react";

import { v4 } from "uuid";

import { css } from "@emotion/css";

// components
import Masonry from "./components/Masonry/Masonry";
import Loading from "../../components/Loading/Loading";

// manager
import { removeNotesOfTag, createTask, initTasks, deleteTask } from "./components/Task/local";

function Home() {
  const [tags, setTags] = useState(["Tareas"]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const onAddTag = useCallback(() => {
    setTags([...tags, `Nueva etiqueta ${tags.length}`]);
  }, [tags]);

  const addTask = useCallback(
    (tag) => {
      const id = v4();
      createTask(id, tag);
      setTasks([...tasks, { id, tag }]);
    },
    [tasks]
  );

  const onChangeTag = (newValue, oldValue) => {
    console.log(newValue, oldValue);
  };

  const onDeleteTag = useCallback(
    (tag) => {
      console.log(tag);
      const newTags = [...tags];
      // removing tag
      newTags.splice(newTags.indexOf(tag), 1);
      // removing notes of that tag
      removeNotesOfTag(tag);
      setTasks(initTasks());
      setTags(newTags);
    },
    [tags]
  );

  useEffect(() => {
    setTasks(initTasks());
  }, []);

  return (
    <main className="main flex w-full p-5 mt-20 overflow-auto">
      <Masonry
        elements={tasks}
        tags={tags}
        onAdd={addTask}
        onAddTag={onAddTag}
        onDelete={onDelete}
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
