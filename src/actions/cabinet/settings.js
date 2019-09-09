import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import schemaAPI from '../../services/schema_out';
import store from "../../store";

console.log(33, schemaAPI);

export function loadSettings() {
  return dispatch => {
    dispatch({ type: actionTypes.SETTINGS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(schemaAPI["profile/settings"]).then((data) => {
      dispatch({ type: actionTypes.SETTINGS_SET, user: {...data} });
      dispatch({ type: actionTypes.SETTINGS_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
      dispatch({ type: actionTypes.SETTINGS_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    });
  };
}

export function sendSmsCode({phone_code, phone_number, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI["profile/send_sms"], {phone_code, phone_number, ga_code}
    ).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeLogin({login, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI["profile/change_login"], {login, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeEmail({email, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI["profile/change_email"], {email, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeInfo({first_name, last_name, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI["profile/change_info"], {first_name, last_name, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeNumber({phone_code, phone_number, sms_code}) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI["profile/change_phone_number"], {phone_code, phone_number, sms_code}).then((data) => {
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