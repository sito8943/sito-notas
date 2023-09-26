import React, { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

import { css } from "@emotion/css";

// font awesome
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// components
import Task from "./components/Task/Task";
import Loading from "../../components/Loading/Loading";
import FloatingButton from "../../components/FAB/FAB";
import PrintAfter from "../../components/PrintAfter/PrintAfter";

// manager
import { createTask, initTasks, deleteTask } from "./components/Task/local";

function Home() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const onDelete = useCallback(
    (id) => {
      const newTasks = [...tasks];
      newTasks.splice(newTasks.indexOf(id), 1);
      setTasks(newTasks);
      deleteTask(id);
    },
    [tasks]
  );

  const tasksMemo = useMemo(() => {
    return tasks.map((task, i) => (
      <li key={task}>
        <PrintAfter delay={150} animation="aGrow">
          <Task id={task} onDelete={onDelete} />
        </PrintAfter>
      </li>
    ));
  }, [tasks, onDelete]);

  const addTask = useCallback(() => {
    const id = v4();
    createTask(id);
    setTasks([...tasks, id]);
  }, [tasks]);

  useEffect(() => {
    setTasks(initTasks());
  }, []);

  return (
    <main className="flex min-h-screen w-full p-5 overflow-auto">
      <FloatingButton
        icon={faAdd}
        type="button"
        name="add-task"
        onClick={addTask}
        className="secondary submit border-none fixed bottom-5 right-5"
        aria-label="click to add a new task"
      />

      <div className="">
        <ul className="flex flex-wrap gap-4 w-full">{tasksMemo}</ul>
      </div>
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
