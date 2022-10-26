import * as actionTypes from '../actionTypes';

export const setWalletTokens = (tokens) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DAPP_SET_WALLET_TOKENS, payload: tokens });
  };
};

/**
 * Sets dapp transactions items
 * @param {Array} items
 * @returns {function} dispatch
 */
export const setTransactionItems = (items) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_TRANSACTION_ITEMS,
      payload: items,
    });
  };
};

/**
 * Sets dapp transactions data status
 * @param {dataStatus.any} status
 * @returns {function} dispatch
 */
export const setTransactionsStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SET_TRANSACTIONS_STATUS,
      payload: status,
    });
  };
};

/**
 * Sorts dapp transactions of sortType
 * @param {sortTypes.any} sortType
 * @returns {function} dispatch
 */
export const sortTransactions = (sortType) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DAPP_SORT_TRANSACTIONS,
      payload: sortType,
    });
  };
};

export const setInvoice = (payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DAPP_SET_INVOICE, payload });
  };
};
