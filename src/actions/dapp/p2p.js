import * as actionTypes from '../actionTypes';

/**
 *  Sets p2p mode.
 * @param {'buy' | 'sell'} mode
 * @returns dispatch
 */
export const setP2PMode = (mode) => (dispatch) =>
  dispatch({ type: actionTypes.DAPP_SET_P2P_MODE, payload: mode });

/**
 *  Sets p2p payment.
 * @param {'buy' | 'sell'} mode
 * @param {object} payment
 * @returns dispatch
 */
export const setP2PPayment = (mode, payment) => (dispatch) => {
  return dispatch({
    type: actionTypes.DAPP_SET_P2P_PAYMENT,
    payload: { payment, mode },
  });
};
