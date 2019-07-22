import * as actionTypes from './actionTypes';
import { AuthApi, AccountApi } from '../swagger';
import callApi from '../services/api';
import store from '../store';


export function getAuth(login, password) {
  const appId = 8;
  const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';

  return new Promise((resolve, reject) => {
    callApi(new AuthApi().authGet, login, password, appId, publicKey)
      .then((auth) => {
        store.dispatch({ type: actionTypes.AUTH, auth });
        resolve(auth);
      })
      .catch((err) => reject(err));
  });
}

export function getGoogleCode(login, password, code) {
  const appId = 8;
  const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';

  return new Promise((resolve, reject) => {

    let params = {
      login,
      password,
      code,
      app_id: appId,
      public_key: publicKey
    };

    let paramsArr = [];
    for (let i in params) {
      paramsArr.push(`${i}=${encodeURIComponent(params[i])}`);
    }
    //
    // fetch(ApiClient.instance.basePath + `/google_code?${paramsArr.join('&')}`, {
    //   credentials: 'include'
    // })
    //   .then(resp => resp.json())
    //   .then(() => resolve())
    //   .catch((err) => reject(err));

    callApi(new AccountApi().googleCodeGet, login, password, code, appId, publicKey)
      .then((resp) => {
        // store.dispatch({type: actionTypes.SET_LANG, auth});
        resolve(resp);
      })
      .catch((err) => reject(err));

  });
}

export function resetGoogleCode(secret, login, password, code) {
  return new Promise((resolve, reject) => {
    callApi(new AccountApi().googleCodeDelete, secret, login, password)
      .then(() => {
        // store.dispatch({type: actionTypes.SET_LANG, auth});
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function resetPassword(email) {
  return new Promise((resolve, reject) => {
    callApi(new AccountApi().accountResetPasswordPost, email)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}


export function registerUser(email, refer) {
  return new Promise((resolve, reject) => {
    callApi(new AccountApi().accountRegisterPut, email, refer)
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}
