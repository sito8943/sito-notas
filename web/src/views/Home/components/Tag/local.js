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
  tags[parsedTag] = { id: parsedTag, color: "#00000000" };
  localStorage.setItem(config.tags, encrypt(tags));
  return { id: parsedTag, color: "#00000000" };
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

  if (tags[oldValue]) {
    delete tags[oldValue];
    localStorage.setItem(config.tags, encrypt(tags));
    return createTag(newName);
  }
};

/**
 * @param {string} tag
 * @param {string} color
 */
export const updateTagColor = (tag, color) => {
  const tags = decrypt(localStorage.getItem(config.tags));
  tags[tag].color = color;
  localStorage.setItem(config.tags, encrypt(tags));
};

export const initTags = () => {
  if (localStorage.getItem(config.tags) === null) {
    localStorage.setItem(
      config.tags,
      encrypt({ Tareas: { id: "Tareas", color: "#00000000" } })
    );
    return [];
  }
  const tags = decrypt(localStorage.getItem(config.tags));
  return Object.values(tags);
};
