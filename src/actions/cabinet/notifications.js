import * as actionTypes from "../actionTypes";
import * as api from "../../services/api";
import apiSchema from '../../services/apiSchema';

export function loadNotifications() {
  return dispatch => {
    api.call(apiSchema.Notification.DefaultGet).then(({ notifications }) => {
      dispatch({ type: actionTypes.NOTIFICATIONS_SET, notifications });
    }).catch((err) => {
      console.log(err);
    });
  };
}