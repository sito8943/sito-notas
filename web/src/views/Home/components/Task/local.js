// utils
import { decrypt, encrypt } from "../../../../utils/crypto";

import config from "../../../../config";

/**
 *
 * @param {string} id
 * @param {string} tag
 * @param {string} content
 */
export const createTask = (id, tag, content) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  tasks[id] = {
    id,
    tag,
    content:
      content ||
      `# ${tag} ${Object.keys(tasks).length + 1} \n Escribe el contenido aquí`,
  };

  localStorage.setItem(config.tasks, encrypt(tasks));
};

/**
 *
 * @param {string} id
 * @returns
 */
export const getTask = (id) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  return tasks[id];
};

/**
 *
 * @param {string} tag
 * @returns
 */
export const getTasksByTag = (tag) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  const tasksByTag = Object.values(tasks).filter((task) => task.tag === tag);
  return tasksByTag;
};

/**
 *
 * @param {string} id
 * @param {string} key
 * @param {string} value
 */
export const updateTask = (id, key, value) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  tasks[id][key] = value;
  localStorage.setItem(config.tasks, encrypt(tasks));
};

/**
 *
 * @param {string} id
 */
export const deleteTask = (id) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  delete tasks[id];
  localStorage.setItem(config.tasks, encrypt(tasks));
};

/**
 *
 * @param {string} tag
 */
export const removeNotesOfTag = (tag) => {
  const tasks = decrypt(localStorage.getItem(config.tasks));
  const idsToDelete = Object.values(tasks).filter((task) => task.tag === tag);

  idsToDelete.forEach((task) => {
    delete tasks[task.id];
  });
  localStorage.setItem(config.tasks, encrypt(tasks));
};

/**
 *
 * @param {string} newValue
 * @param {string} oldValue
 */
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
