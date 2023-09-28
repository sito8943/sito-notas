// utils
import { decrypt, encrypt } from "../../../../utils/crypto";

import config from "../../../../config";

export const createTask = (id, tag) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  tasks[id] = {
    id,
    tag,
    content: `# Nota ${tag} ${
      Object.keys(tasks).length + 1
    } \n Escribe el contenido aquí`,
  };

  localStorage.setItem(config.tasks, encrypt(tasks));
};

export const getTask = (id) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  return tasks[id];
};

export const updateTask = (id, key, value) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  tasks[id][key] = value;
  localStorage.setItem(config.tasks, encrypt(tasks));
};

export const deleteTask = (id) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  delete tasks[id];
  localStorage.setItem(config.tasks, encrypt(tasks));
};

export const removeNotesOfTag = (tag) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  const idsToDelete = Object.values(tasks).filter((task) => task.tag === tag);

  idsToDelete.forEach((task) => {
    delete tasks[task.id];
  });
  localStorage.setItem(config.tasks, encrypt(tasks));
};

export const updateNotesTags = (newValue, oldValue) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  const idsToDelete = Object.values(tasks).filter(
    (task) => task.tag === oldValue
  );

  idsToDelete.forEach((task) => {
    tasks[task.id].tag = newValue;
  });
  localStorage.setItem(config.tasks, encrypt(tasks));
};

export const initTasks = () => {
  if (localStorage.getItem(config.tasks) === null) {
    localStorage.setItem(config.tasks, encrypt({}));
    return [];
  }
  const tasks = decrypt(localStorage.getItem(config.tasks));

  return Object.values(tasks);
};
