// utils
import { decrypt, encrypt } from "../../../../utils/crypto";

import config from "../../../../config";

/**
 *
 * @param {string} tag
 * @returns available name
 */
export const createTag = (tag) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  let parsedTag = tag;
  while (tags[parsedTag]) parsedTag = `${parsedTag}'`;
  tags[parsedTag] = parsedTag;
  localStorage.setItem(config.tags, encrypt(tags));
  return parsedTag;
};

/**
 *
 * @param {string} tag
 */
export const deleteTag = (tag) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  delete tags[tag];
  localStorage.setItem(config.tags, encrypt(tags));
};

/**
 * @param {string} newName
 * @param {string} oldValue
 * @returns available name
 */
export const updateTag = (newName, oldValue) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  if (tags[oldValue]) delete tags[oldValue];
  return createTag(newName);
};

export const initTags = () => {
  if (localStorage.getItem(config.tags) === null) {
    localStorage.setItem(config.tags, encrypt({ Tareas: "Tareas" }));
    return [];
  }
  const tags = decrypt(localStorage.getItem(config.tags));
  return Object.keys(tags);
};
