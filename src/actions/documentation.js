import * as actionTypes from "./actionTypes";
import * as api from "../services/api";
import { isJson } from "src/utils";
import apiSchema from "../services/apiSchema";

export function tootleMenu(path) {
  return dispatch => {
    dispatch({ type: actionTypes.DOCUMENTATION_TOGGLE_MENU, path });
  };
}

export function getDocumentation() {
  return dispatch => {
    api
      .call(apiSchema.Documentation.DefaultGet, { description: true })
      .then(({ schema }) => {
        dispatch({ type: actionTypes.DOCUMENTATION_INIT, schema });
        dispatch({
          type: actionTypes.DOCUMENTATION_SET_STATUS,
          status: "default",
          value: ""
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.DOCUMENTATION_SET_STATUS,
          status: "default",
          value: "failed"
        });
      });
  };
}

export function getMethod(key) {
  return dispatch => {
    dispatch({
      type: actionTypes.DOCUMENTATION_SET_STATUS,
      status: "method",
      value: "loading"
    });
    api
      .call(apiSchema.Documentation.MethodGet, { key })
      .then(method => {
        dispatch({ type: actionTypes.DOCUMENTATION_METHOD, method });
        dispatch({
          type: actionTypes.DOCUMENTATION_SET_STATUS,
          status: "method",
          value: ""
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.DOCUMENTATION_SET_STATUS,
          status: "method",
          value: "failed"
        });
      });
  };
}

export function updateMethodParam(paramName, description) {
  return dispatch => {
    dispatch({
      type: actionTypes.DOCUMENTATION_UPDATE_METHOD_PARAM_DESC,
      paramName,
      description
    });
  };
}

export function updateMethod(key, value) {
  return dispatch => {
    dispatch({ type: actionTypes.DOCUMENTATION_UPDATE_METHOD, key, value });
  };
}

export function saveMethod(values) {
  return (dispatch, getState) => {
    const { method } = getState().documentation;

    if (!isJson(method.result)) {
      return alert("Поле result должно быть валидным json");
    }

    api
      .call(apiSchema.Documentation.MethodPost, {
        ...method,
        param_descriptions: JSON.stringify(
          method.params.reduce(
            (obj, p) => ({ ...obj, [p.name]: p.description }),
            {}
          )
        ),
        ...values
      })
      .then(method => {})
      .catch(() => {});
  };
}
