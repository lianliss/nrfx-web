import * as storage from './storage';

export function getToken() {
  return storage.getItem('access_token');
}

export function isLogged() {
  return getToken() !== null;
}

export function setup(token) {
  if (isLogged()) {}
}

export function login(accessToken) {
  setup(accessToken);
  return storage.setItem('access_token', accessToken);
}

export function logout() {
  storage.clear();
}