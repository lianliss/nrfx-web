import * as actionTypes from '../actionTypes';

export const setWalletTokens = (tokens) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DAPP_SET_WALLET_TOKENS, payload: tokens });
  };
};

export const setInvoice = (payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DAPP_SET_INVOICE, payload });
  };
};
