import * as actionTypes from '../actionTypes';

export function setSwap(from, to) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_SWAP,
      payload: {
        from: from,
        to: to,
      },
    });
  };
}