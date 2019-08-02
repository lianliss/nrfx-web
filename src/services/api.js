import { ApiClient } from '../swagger';

import * as auth from './auth';

const API_ENTRY = 'https://api.bitcoinbot.pro';
const API_VERSION = 1;

export const Errors = {
  FATAL: 1,
  AUTH: 2,
  PARAM: 3,
  LOGIN_BAD_PARAMS: 4,
  BLOCKED: 5,
  PHONE_VERIFICATION: 6,
  BAD_CODE: 7,
  BAD_EMAIL: 8,
  BAD_REFERER: 9,
  EMAIL_USED: 10,
};

export default function callApi(callable) {
  return new Promise((resolve, reject) => {
    window.ApiClient = ApiClient;
    let args = [].slice.call(arguments).slice(1);
    args.push(async (error, data, resp) => {
      if (error) {
        if (!resp) {
          reject({http: true});
        }
        //console.log('Error', error);
        console.log(resp.body);
        if (resp.body.code === Errors.AUTH) {
          auth.logout();
        }
        return reject(resp.body);
      }

      //console.log('resp', resp);

      resolve(resp.body);
    });

    callable.call({apiClient: ApiClient.instance}, ...args);
  });
}

export function invoke(method, name, params) {
  return new Promise((resolve, reject) => {

    const params_arr = [];
    for (let key in params) {
      params_arr.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    let init = {
      method,
      headers: {
        'X-Token': auth.getToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let url = `${API_ENTRY}/api/v${API_VERSION}/${name}`;
    if (method === 'GET') {
      url += `?${params_arr.join('&')}`;
    } else {
      init.body = params_arr.join('&');
    }

    fetch(url, init)
      .then(resp => {
        if (resp.status === 403) {
          auth.logout();
          window.location.href = '/';
          return;
        }

        resp.json().then((json) => {
          if (resp.status === 200) {
            resolve(json);
          } else {
            reject(json);
          }
        }).catch((err) => {
          console.log(err);
          reject({code: -1, message: 'Cant\'t parse JSON'})
        });
      });
  });
}

export function get(name, params = {}) {
  return invoke('GET', name, params);
}

export function post(name, params = {}) {
  return invoke('POST', name, params);
}

export function del(name, params = {}) {
  return invoke('DELETE', name, params);
}