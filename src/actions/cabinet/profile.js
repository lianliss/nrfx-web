// styles
// external
// internal
import apiSchema from '../../services/apiSchema';
import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import * as toastsActions from './toasts';
import * as modalGroup from '../modalGroup';
import * as utils from '../../utils/index'

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

export function changeSecretKay(secret) {
  return (dispatch, getState) => {
    api.call(apiSchema.Profile.SecretKeyLoggedPost, { secret }).then((dashboard) => {
      toastsActions.toastPush(utils.getLang("cabinet_secretKeyChangedSuccessfully"), "success")(dispatch, getState);
      modalGroup.modalGroupClear();
    }).catch((err) => {
      toastsActions.toastPush(err.message, "error")(dispatch, getState);
    });
  };
}

export function gaInit(code) {
  return (dispatch, getState) => {
    api.call(apiSchema.Profile.GaInitPost, { ga_code: code }).then((dashboard) => {
      modalGroup.modalGroupClear();
      toastsActions.toastPush(utils.getLang("cabinet_gaCodeChangedSuccessfully"), "success")(dispatch, getState);
    }).catch((err) => {
      toastsActions.toastPush(err.message, "error")(dispatch, getState);
    });
  };
}

export function getPartner() {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'partners', status: 'loading' });
    api.call(apiSchema.Partner.DefaultGet).then(partner => {
      dispatch({ type: actionTypes.PROFILE_PARTNER_SET, partner });
      dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'partners', status: '' });
    }).catch(() => {
      toastsActions.toastPush("Error load partner", "error")(dispatch, getState);
      dispatch({ type: actionTypes.PROFILE_SET_LOADING_STATUS, section: 'partners', status: 'failed' });
    });
  };
}