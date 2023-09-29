// utils
import { decrypt, encrypt } from "../../../../utils/crypto";

import config from "../../../../config";

export const createTag = (tag) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  if (!tags[tag]) {
    tags[tag] = tag;
    localStorage.setItem(config.tags, encrypt(tags));
    return true;
  }
  return false;
};

export const deleteTag = (tag) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  delete tags[tag];
  localStorage.setItem(config.tags, encrypt(tags));
};

export const updateTag = (newName, oldValue) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  if (tags[oldValue]) delete tags[oldValue];
  tags[newName] = newName;
  localStorage.setItem(config.tags, encrypt(tags));
};

export const initTags = () => {
  if (localStorage.getItem(config.tags) === null) {
    localStorage.setItem(config.tags, encrypt({ Tareas: "Tareas" }));
    return [];
  }
  const tags = decrypt(localStorage.getItem(config.tags));
  return Object.keys(tags);
};
