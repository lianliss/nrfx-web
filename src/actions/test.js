import * as actionTypes from './actionTypes';
import * as api from '../services/api';
import { AuthApi } from '../swagger';

export function update() {
  return (dispatch) => {
    const appId = 8;
    const publicKey = '1a4b26bc31-a91649-b63396-253abb8d69';

    api.callApi(new AuthApi().authGet, 'login', 'password', appId, publicKey).then((resp) => {
      console.log('success', resp)
    }).catch((error) => {
      dispatch({type: actionTypes.TEST, message: error.message});
    });
  };
}
