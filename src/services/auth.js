import { ApiClient } from '../swagger/src';
import * as storage from './storage';

export function getToken() {
  return 'ae5ef1fc21c5f8022ab5cf79891036793fb53b3669b5aa801674ec0f90b5d57a691db955480aef890ade58edadf1d5366362cf674bed2aee60e667d48a73238c';
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
