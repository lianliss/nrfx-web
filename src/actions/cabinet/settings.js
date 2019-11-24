// styles
// external
// internal
import apiSchema from '../../services/apiSchema';
import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import * as toastsActions from '../toasts';
import store from '../../store';

export function loadSettings() {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SETTINGS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Profile.SettingsGet).then((data) => {
      dispatch({ type: actionTypes.SETTINGS_SET, user: {...data} });
      dispatch({ type: actionTypes.SETTINGS_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
      toastsActions.toastPush("Error load settings", "error")(dispatch, getState);
      dispatch({ type: actionTypes.SETTINGS_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    });
  };
}

export function sendSmsCode({phone_code, phone_number, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.SendSmsPost, {phone_code, phone_number, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeLogin({login, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ChangeLoginPut, {login, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeEmail({email, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ChangeEmailPost, {email, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeInfo({first_name, last_name, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ChangeInfoPut, {first_name, last_name, ga_code}).then((data) => {
      store.dispatch({ type: actionTypes.SET_USER_NAME, first_name, last_name  })
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeNewPassword(params) {
  return api.call(apiSchema.Profile.ChangePasswordPost, params);
}

export function changeNumber({phone_code, phone_number, sms_code}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ChangePhoneNumberPut, {phone_code, phone_number, sms_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function setUserFieldValue(action) {
  return dispatch => {
    dispatch({type: actionTypes.SETTINGS_USER_FIELD_SET, field: action.field, value: action.value})
  };
}
