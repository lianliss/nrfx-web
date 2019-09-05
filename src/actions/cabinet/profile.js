import * as actionTypes from "../actionTypes";
import * as api from "../../services/api";
import schemaAPI from '../../services/schema_out';

export function loadDashboard() {
  return dispatch => {
    dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(schemaAPI["dashboard/"]).then((dashboard) => {
      dispatch({ type: actionTypes.PROFILE_DASHBOARD_SET, dashboard});
      dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch((err) => {
      dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    });
  };
}