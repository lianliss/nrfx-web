import { ApiClient } from '../swagger/src';
import * as storage from './storage';

export function getToken() {
  return 'caa6f3fd3f3c5b6e1eff538c347b970df62ea6b9442e20c09b7715d16d5e5e9cdf92e21c0f68db2dbb90ddb6064834604ba725adc9c1de7f9310cfda6ea181a3';
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
