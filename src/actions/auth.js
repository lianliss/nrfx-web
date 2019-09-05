import * as actionTypes from './actionTypes';
import { AuthApi, AccountApi } from '../swagger';
import * as api from '../services/api';
import * as auth from '../services/auth';
import store from '../store';
import schemaAPI from '../services/schema_out';

export function getAuth(login, password) {
  const app_id = 8;
  const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';

  return new Promise((resolve, reject) => {
    api.call(schemaAPI["profile/sign_in"], {login, password, app_id})
      .then((auth) => {
        store.dispatch({ type: actionTypes.AUTH, auth });
        resolve(auth);
      })
      .catch((err) => reject(err));
  });
}

// export function getAuth(login, password) {
//   const app_id = 8;
//   const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';
//
//   return new Promise((resolve, reject) => {
//     api.post(schemaAPI.signin.path + '?login=' + login + '&password=' + password + '&app_id=' + app_id)
//       .then((auth) => {
//         store.dispatch({ type: actionTypes.AUTH, auth });
//         resolve(auth);
//       })
//       .catch((err) => reject(err));
//   });
// }

// export function getAuth(login, password) {
//   const appId = 8;
//   const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';
//
//   return new Promise((resolve, reject) => {
//     api.callApi(new AuthApi().authGet, login, password, appId, publicKey)
//       .then((auth) => {
//         store.dispatch({ type: actionTypes.AUTH, auth });
//         resolve(auth);
//       })
//       .catch((err) => reject(err));
//   });
// }

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

    api.callApi(new AccountApi().googleCodeGet, login, password, code, appId, publicKey)
      .then((resp) => {
        auth.login(resp.access_token);
        resolve(resp);
      })
      .catch((err) => reject(err));

  });
}

export function resetGoogleCode(secret, login, password, code) {
  return new Promise((resolve, reject) => {
    api.callApi(new AccountApi().googleCodeDelete, secret, login, password)
      .then(() => {
        // store.dispatch({type: actionTypes.SET_LANG, auth});
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function resetPassword(email) {
  return new Promise((resolve, reject) => {
    api.callApi(new AccountApi().accountResetPasswordPost, email)
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}


export function sendSmsCode(countryCode, number, gaCode) {
  return new Promise((resolve, reject) => {
    api.callApi(new AccountApi().accountSmsPut, countryCode, number, gaCode)
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function checkSmsCode(countryCode, number, code) {
  return new Promise((resolve, reject) => {
    api.callApi(new AccountApi().accountSmsGet, countryCode, number, code)
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function registerUser(email, refer = null) {
  return new Promise((resolve, reject) => {
    api.callApi(new AccountApi().accountRegisterPut, email, refer||null)
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}
