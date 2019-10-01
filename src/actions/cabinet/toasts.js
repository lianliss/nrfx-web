// styles
// external
// internal
import * as actionTypes from '../actionTypes';

export function toastPush(message, type) {
  return (dispatch, getStore) => {
    const id = getStore().toasts.counter;

    dispatch({ type: actionTypes.TOASTS_PUSH, payload: { type, message, id }});

    setTimeout(() => {
      dispatch({ type: actionTypes.TOASTS_HIDE, id });
    }, 3000);

    setTimeout(() => {
      dispatch({ type: actionTypes.TOASTS_DROP, id });
    }, 5000);
  };
}

export function toastDrop(id) {
  return dispatch => {
    dispatch({ type: actionTypes.TOASTS_DROP, id});
  };
}