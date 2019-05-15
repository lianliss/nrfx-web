import * as storage from './storage';
import { ApiClient } from '../swagger';

function getToken() {
  return storage.getItem('access_token');
}

export function isLogged() {
  return getToken() !== null;
}

export function login(accessToken) {
  return storage.setItem('access_token', accessToken);
}

export function logout() {
  storage.removeItem('access_token');
}

export function setup() {
  if (isLogged()) {
    ApiClient.instance.defaultHeaders['X-Token'] = getToken();
  }
}
