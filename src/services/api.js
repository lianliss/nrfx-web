import * as auth from './auth';

const API_ENTRY = 'https://api.narfex.com';
const API_VERSION = 1;

export const EXPORT_API_VERSION = API_VERSION;
export const EXPORT_API_ENTRY = API_ENTRY;

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

export function invoke(method, name, params, options = {}) {
  return new Promise((resolve, reject) => {

    const params_arr = [];
    for (let key in params) {
      params_arr.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    let init = {
      method,
      headers: {
        'X-Token': auth.getToken(),
        'X-Beta': 1,
        'Content-Type': 'application/json',
        'Accept-Language': window.localStorage.lang || 'en'
      }
    };

    const apiEntry = options.apiEntry || API_ENTRY;
    let url = `${apiEntry}/api/v${API_VERSION}/${name}`;
    if (method === 'GET') {
      url += `?${params_arr.join('&')}`;
    } else {
      init.body = JSON.stringify(params);
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
            json.error_name = 'failed';
            reject(json);
          }
        }).catch(() => reject({code: -1, message: 'Cant\'t parse JSON', error_name: 'failed'}));
      })
      .catch((err) => reject({code: -2, ...err, error_name: 'failed_connection'}));
  });
}

export function get(name, params = {}) {
  return invoke('GET', name, params);
}

export function post(name, params = {}) {
  return invoke('POST', name, params);
}

export function put(name, params = {}) {
  return invoke('PUT', name, params);
}

export function del(name, params = {}) {
  return invoke('DELETE', name, params);
}

export function call(API, params = {}, options = {}) {
  return invoke(API.method, API.path, params, options);
}