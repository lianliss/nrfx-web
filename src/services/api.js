import * as auth from "./auth";
import * as action from "../actions/";
import { clearProfile } from "../actions/auth";
import router from "../router";
import * as PAGES from "../index/constants/pages";
import { login } from "./auth";

export const APP_ID = 8;
const BRANCH_NAME = process.env.BRANCH_NAME;
const LOCAL_API_ENDPOINT = process.env.REACT_APP_LOCAL_API_ENDPOINT;

function getApiEntry() {
  if (LOCAL_API_ENDPOINT) {
    return LOCAL_API_ENDPOINT;
  } else {
    return BRANCH_NAME && BRANCH_NAME !== "gcloud"
      ? `https://api-${BRANCH_NAME}.narfex.dev`
      : "https://api.narfex.com";
  }
}

export const API_ENTRY = getApiEntry();
export const API_VERSION = 1;

export function invoke(method, name, params, options = {}) {
  return new Promise((resolve, reject) => {
    const params_arr = [];
    for (let key in params) {
      params_arr.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    const formData = new FormData();
    let includesFile = false;
    Object.keys(params).forEach(paramsName => {
      formData.append(paramsName, params[paramsName]);
      if (params[paramsName] && typeof params[paramsName].name === "string") {
        includesFile = true;
      }
    });

    let init = {
      method,
      headers: {
        "X-Token": auth.getToken(),
        "X-Beta": 1,
        "X-APP-ID": APP_ID,
        "Content-Type": includesFile
          ? "application/x-www-form-urlencoded"
          : "application/json",
        "Accept-Language": window.localStorage.lang || "en"
      }
    };

    const apiEntry = options.apiEntry || API_ENTRY;
    let url = `${apiEntry}/api/v${API_VERSION}/${name}`;
    if (method === "GET") {
      url += `?${params_arr.join("&")}`;
    } else {
      init.body = includesFile ? formData : JSON.stringify(params);
    }

    fetch(url, init)
      .then(resp => {
        const authToken = resp.headers.get("auth-token");
        authToken && login(authToken);

        if (resp.status === 403) {
          clearProfile();
          reject({ message: "403 Forbidden: Invalid credentials" });
          console.log(1, options.redirect, true);
          if (options.redirect !== false) {
            router.navigate(PAGES.MAIN);
          }
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
              if (resp.status === 404) {
                // HACK
                json.code = "not_found";
              } else {
                json.code = "failed";
              }
              reject(json);
            }
          })
          .catch(() =>
            reject({ message: "Cant't parse JSON", code: "failed" })
          );
      })
      .catch(err =>
        reject({
          ...err,
          message: "Failed connection",
          code: "failed_connection"
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
  console.log(API);
  return invoke(API.method, API.path, params, options);
}
