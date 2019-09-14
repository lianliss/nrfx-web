import * as actionTypes from "../actionTypes";
import * as api from "../../services/api";
import apiSchema from '../../services/apiSchema';
import * as toastsActions from './toasts';

export function loadDashboard() {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Dashboard.DefaultGet).then((dashboard) => {
      dispatch({ type: actionTypes.PROFILE_DASHBOARD_SET, dashboard});
      dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch((err) => {
      toastsActions.toastPush("Error load dashboard", "error")(dispatch, getState);
      dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    });
  };
}