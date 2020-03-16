// styles
// external
// internal
import apiSchema from "../../services/apiSchema";
import * as actionTypes from "../actionTypes";
import * as api from "../../services/api";
import * as toastsActions from "../toasts";

export function loadNotifications() {
  return (dispatch, getState) => {
    api
      .call(apiSchema.Notification.DefaultGet)
      .then(({ notifications }) => {
        dispatch({ type: actionTypes.NOTIFICATIONS_SET, notifications });
      })
      .catch(err => {
        toastsActions.toastPush("Error load notifications", "error")(
          dispatch,
          getState
        );
      });
  };
}

export function submitAction(id, action) {
  return dispatch => {
    dispatch({ type: actionTypes.NOTIFICATIONS_DELETE, id });
    api
      .call(apiSchema.Notification.DefaultDelete, {
        id,
        action: action.action,
        params: JSON.stringify(action.params)
      })
      .then(({ message }) => {
        if (message) {
          toastsActions.success(message);
        }
      })
      .catch(err => {
        toastsActions.error(err.message);
        dispatch({ type: actionTypes.NOTIFICATIONS_RESTORE, id });
      });
  };
}
