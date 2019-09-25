// styles
// external
// internal
import store from '../store';
import apiSchema from '../services/apiSchema';
import * as actionTypes from './actionTypes';
import * as api from '../services/api';
import * as auth from '../services/auth';
import * as user from './user';
import * as emitter from '../services/emitter';

export function getAuth(login, password) {
  const app_id = 8;
  const public_key = '1a4b26bc31-a91649-b63396-253abb8d69';

  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.SignInPost, { login, password, app_id, public_key })
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

export function logout() {
  auth.logout();
  store.dispatch({type: actionTypes.LOGOUT});
}

export function getGoogleCode(login, password, code) {
  const appId = 8;
  const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';

  return new Promise((resolve, reject) => {
    let params = {
      login,
      password,
      ga_code: code,
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

    api.call(apiSchema.Profile.SignInTwoStepPost, {
      login,
      password,
      ga_code: code,
      app_id: appId,
      public_key: publicKey
    })
      .then((resp) => {
        auth.login(resp.access_token);
        user.install().then(() => {
          resolve(resp);
        });
      })
      .catch((err) => reject(err));
  });
}

export function resetGoogleCode(secret, login, password, code) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ResetGaPost, { secret, login, password })
      .then(() => {
        // store.dispatch({type: actionTypes.SET_LANG, auth});
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function resetPassword(email) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ResetPasswordPost, { email })
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}


export function sendSmsCode(phone_code, phone_number, hash) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.FillAccountSendSmsPut, { phone_code, phone_number, hash })
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function checkSmsCode(countryCode, number, code) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.ChangePhoneNumberPut, { countryCode, number, code })
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function registerUser(email, refer = null) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Profile.SignUpPut, { email, refer })
      .then((auth) => {
        resolve();
      })
      .catch((err) => reject(err));
  });
}
