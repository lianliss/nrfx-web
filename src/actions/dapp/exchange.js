import * as actionTypes from '../actionTypes';

/**
 * Sets dapp exchange amount for focus input
 * @param {number} amount
 * @param {'from' | 'to'} focus
 * @returns {function} dispatch
 */
export function setExchangeAmount(amount, focus) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_EXCHANGE_AMOUNT,
      payload: {
        amount,
        focus,
      },
    });
  };
}

/**
 * Sets dapp exchange token for focus input
 * @param {tokenObject} token
 * @param {'from' | 'to'} focus
 * @returns {function} dispatch
 */
export function setExchangeToken(token, focus) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_EXCHANGE_TOKEN,
      payload: {
        token,
        focus,
      },
    });
  };
}

/**
 * Sets dapp exchange focus
 * @param {'from' | 'to'} focus
 * @returns {function} dispatch
 */
export function setExchangeFocus(focus) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_EXCHANGE_FOCUS,
      payload: focus,
    });
  };
}
