// styles
// external
// internal
import * as actionTypes from '../actionTypes';
import store from '../../store';

export function toastPush(message, type) {
  return () => push(message, type);
  // TODO: Переделать везде toastPush на success, error, warning
}

function push(message, type) {
  const id = store.getState().toasts.counter;

  store.dispatch({ type: actionTypes.TOASTS_PUSH, payload: { type, message, id }});

  setTimeout(() => store.dispatch({ type: actionTypes.TOASTS_HIDE, id }), 3000);
  setTimeout(() => store.dispatch({ type: actionTypes.TOASTS_DROP, id }), 5000);
}

export function success(message) {
  push(message, 'success');
}

export function warning(message) {
  push(message, 'warning');
}

export function error(message) {
  push(message, 'error');
}

export function toastDrop(id) {
  return dispatch => {
    dispatch({ type: actionTypes.TOASTS_DROP, id});
  };
}