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
      .call(apiSchema.Documentation.DefaultGet)
      .then(({ schema }) => {
        dispatch({ type: actionTypes.DOCUMENTATION_INIT, status: "", schema });
      })
      .catch(() => {
        dispatch({ type: actionTypes.DOCUMENTATION_INIT, status: "failed" });
      });
  };
}
