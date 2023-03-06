import * as actionTypes from '../actionTypes';

/**
 *  Sets p2p mode.
 * @param {'buy' | 'sell'} mode
 * @returns dispatch
 */
export const setP2PMode = (mode) => (dispatch) =>
  dispatch({ type: actionTypes.DAPP_SET_P2P_MODE, payload: mode });
