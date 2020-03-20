import * as actionTypes from "./actionTypes";
import * as api from "../services/api";
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
