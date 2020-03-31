import * as storage from "./storage";
import { INTERNAL_NOTIFICATION_KEY } from "../index/constants/internalNotifications";
import store from "../store";
import * as actionTypes from "../actions/actionTypes";

export function getToken() {
  return storage.getItem("access_token");
}

export function isLogged() {
  return getToken() !== null;
}

export function setup(token) {
  if (isLogged()) {
  }
}

export function login(accessToken) {
  setup(accessToken);
  return storage.setItem("access_token", accessToken);
}

export function logout() {
  store.dispatch({ type: actionTypes.LOGOUT });
  storage.removeItem("access_token");
  storage.removeItemsByKey(INTERNAL_NOTIFICATION_KEY);
}
