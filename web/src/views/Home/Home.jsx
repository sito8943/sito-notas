import React, { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

// font awesome
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// components
import Task from "./components/Task/Task";
import FloatingButton from "../../components/FAB/FAB";
import PrintAfter from "../../components/PrintAfter/PrintAfter";

// manager
import { createTask, initTasks, deleteTask } from "./components/Task/local";

function Home() {
  const [tasks, setTasks] = useState([]);

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
    <main className="relative flex h-screen w-full bg-dark-background2 p-5 overflow-auto">
      <FloatingButton
        icon={faAdd}
        type="button"
        name="add-task"
        onClick={addTask}
        className="primary"
        aria-label="click to add a new task"
      />

      <div className="">
        <ul className="flex flex-wrap gap-4 w-full">{tasksMemo}</ul>
      </div>
    </main>
  );
}

export default Home;
