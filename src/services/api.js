import * as auth from "./auth";
import * as action from "../actions/";
import { clearProfile } from "../actions/auth";
import router from "../router";
import * as adminPages from "../admin/constants/pages";

// export const API_ENTRY = "https://api.narfex.com";
export const API_ENTRY = "https://api-be-107.narfex.dev";
export const API_VERSION = 1;

export function invoke(method, name, params, options = {}) {
  return new Promise((resolve, reject) => {
    const params_arr = [];
    for (let key in params) {
      params_arr.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    let init = {
      method,
      headers: {
        "X-Token": auth.getToken(),
        "X-Beta": 1,
        "Content-Type": "application/json",
        "Accept-Language": window.localStorage.lang || "en"
      }
    };

    const apiEntry = options.apiEntry || API_ENTRY;
    let url = `${apiEntry}/api/v${API_VERSION}/${name}`;
    if (method === "GET") {
      url += `?${params_arr.join("&")}`;
    } else {
      init.body = JSON.stringify(params);
    }

    fetch(url, init)
      .then(resp => {
        if (resp.status === 403) {
          clearProfile();
          reject({ message: "403 Forbidden: Invalid credentials" });
          router.navigate(adminPages.MAIN);
          return;
        }

        resp
          .json()
          .then(json => {
            if (resp.status === 200) {
              resolve(json);
            } else {
              if (json.code === "withdraw_disabled") {
                action.openModal("user_block");
              }
              json.error_name = "failed";
              reject(json);
            }
          })
          .catch(() =>
            reject({ message: "Cant't parse JSON", error_name: "failed" })
          );
      })
      .catch(err =>
        reject({
          ...err,
          message: "Failed connection",
          error_name: "failed_connection"
        })
      );
  });
}

export function get(name, params = {}) {
  return invoke("GET", name, params);
}

export function post(name, params = {}) {
  return invoke("POST", name, params);
}

export function put(name, params = {}) {
  return invoke("PUT", name, params);
}

export function del(name, params = {}) {
  return invoke("DELETE", name, params);
}

export function call(API, params = {}, options = {}) {
  return invoke(API.method, API.path, params, options);
}
