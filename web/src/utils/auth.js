/* eslint-disable no-use-before-define */
// @ts-check

import { deleteCookie, getCookie } from "some-javascript-utils/browser";

import config from "../config";

import { decrypt, encrypt } from "./crypto";

export const fromLocal = () => {
  const data = JSON.parse(decrypt(localStorage.getItem(config.user)));
  return data;
};

export const getUserPermissions = () => {
  const data = JSON.parse(decrypt(localStorage.getItem(config.user)));
  return data.permissions;
};

export const getUserPhoto = () => {
  try {
    const data = JSON.parse(decrypt(localStorage.getItem(config.user)));
    return data.photo;
  } catch (err) {
    console.error(err)
  }
  return undefined
};

export const getUserName = () => {
  const data = JSON.parse(decrypt(localStorage.getItem(config.user)));
  return data.user;
};

export const getUserId = () => {
  const data = JSON.parse(decrypt(localStorage.getItem(config.user)));
  return data.id;
};

/**
 * If the user is logged in, return true, otherwise return false.
 */
export const userLogged = () => getCookie(config.basicKey).length > 0;

export const logoutUser = () => {
  localStorage.removeItem(config.user);
  deleteCookie(config.basicKey);
};

/**
 * If remember is true, it stores user data to localStorage, otherwise it stores it in sessionStorage
 * @param {object} data - The user object that you want to store in the browser.
 */
export const logUser = (data) =>
  localStorage.setItem(config.user, encrypt(data));
