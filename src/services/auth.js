import { ApiClient } from '../swagger/src';
import * as storage from './storage';

export function getToken() {
  return storage.getItem('access_token');
}

export function isLogged() {
  return getToken() !== null;
}

export function setup(token) {
  console.log('getToken() :', getToken());
  if (isLogged()) {
    const accessToken = token ? token : getToken();
    ApiClient.instance.defaultHeaders['X-Token'] = accessToken;
  }
}

export function login(accessToken) {
  setup(accessToken);
  return storage.setItem('access_token', accessToken);
}

export function logout() {
  storage.removeItem('access_token');
}
