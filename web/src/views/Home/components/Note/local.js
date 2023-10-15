// utils
import { decrypt, encrypt } from "../../../../utils/crypto";

import config from "../../../../config";

/**
 *
 * @param {string} id
 * @param {string} content
 */
export const createNote = (id, content) => {
  const notes = decrypt(localStorage.getItem(config.notes));
  notes[id] = {
    id,
    content: content || `# Nueva nota \n Escribe el contenio aquí`,
  };

  localStorage.setItem(config.notes, encrypt(notes));
};

/**
 *
 * @param {string} id
 * @returns
 */
export const getNote = (id) => {
  const notes = decrypt(localStorage.getItem(config.notes));
  return notes[id];
};

/**
 *
 * @param {string} id
 * @param {string} key
 * @param {string} value
 */
export const updateNote = (id, key, value) => {
  const notes = decrypt(localStorage.getItem(config.notes));
  notes[id][key] = value;
  localStorage.setItem(config.notes, encrypt(notes));
};

/**
 *
 * @param {string} id
 */
export const removeNote = (id) => {
  const notes = decrypt(localStorage.getItem(config.notes));
  delete notes[id];
  localStorage.setItem(config.notes, encrypt(notes));
};

export const initNotes = () => {
  // localStorage.removeItem(config.notes);
  if (localStorage.getItem(config.notes) === null) {
    localStorage.setItem(config.notes, encrypt({}));
    return [];
  }
  const notes = decrypt(localStorage.getItem(config.notes));

  return Object.keys(notes);
};
