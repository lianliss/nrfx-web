import * as actionTypes from '../actionTypes';

export function setWithdraw(payload) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_WITHDRAW,
      payload,
    });
  };
}
