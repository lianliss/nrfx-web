import * as actionTypes from "./actionTypes";

export function tootleMenu(path) {
  return dispatch => {
    dispatch({ type: actionTypes.DOCUMENTATION_TOGGLE_MENU, path });
  }
}
