// styles
// external
// internal
import store from '../../store';
import apiSchema from '../../services/apiSchema';
import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import * as toastsActions from './toasts';

export function loadWallets() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: actionTypes.WALLETS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
      api.call(apiSchema.Wallet.DefaultGet, {count: 10}).then(({ balances, transactions, transfers }) => {
        dispatch({ type: actionTypes.WALLETS_SET_LOADING_STATUS, section: 'default', status: null });
        dispatch({ type: actionTypes.WALLETS_SET, wallets: balances });
        dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_SET, items: transactions});
        dispatch({ type: actionTypes.WALLETS_TRANFERS_SET, items: transfers });
        resolve(balances);
      }).catch(() => {
        toastsActions.toastPush("Error load wallets", "error")(dispatch, getState);
        dispatch({ type: actionTypes.WALLETS_SET_LOADING_STATUS, section: 'default', status: 'failed' });
        reject();
      });
    });
  };
}

export function getWallets() {
  return new Promise((resolve, reject) => {
    const state = store.getState().wallets;

    if (state.wallets.length > 0) {
      resolve(state.wallets);
    } else {
      loadWallets()(store.dispatch)
        .then((wallets) => resolve(wallets))
        .catch(() => reject());
    }
  });
}

export function loadMoreTransactions() {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: 'loading' });
    api.call(apiSchema.Wallet.TransactionGet, {
      start_from: store.getState().wallets.transactions.next,
      count: 20,
    }).then((data) => {
      let items = data.items;
      let next = data.next;
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: '' });
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_APPEND, items, next });
    }).catch(() => {
      toastsActions.toastPush("Error load more transactions", "error")(dispatch, getState);
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: 'failed' });
    });
  };
}

export function loadMoreTransfers() {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.WALLETS_TRANFERS_LOADING_MORE, status: 'loading' });
    api.call(apiSchema.Wallet.TransferGet, {
      start_from: store.getState().wallets.transfers.next,
      count: 20,
    }).then((data) => {
      let items = data.items;
      let next = data.next;
      dispatch({ type: actionTypes.WALLETS_TRANFERS_LOADING_MORE, status: '' });
      dispatch({ type: actionTypes.WALLETS_TRANFERS_APPEND, items, next });
    }).catch(() => {
      toastsActions.toastPush("Error load more transfers", "error")(dispatch, getState);
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: 'failed' });
    });
  };
}

export function getNoGeneratedCurrencies() {
  const state = store.getState();
  if (state.wallets.loadingStatus.default) {
    return [];
  }

  let exist = {};
  for (let i = 0; i < state.wallets.wallets.length; i++) {
    exist[state.wallets.wallets[i].currency] = true;
  }

  let currencies = [];
  for (let name in state.cabinet.currencies) {
    if (exist[name] || !state.cabinet.currencies[name].can_generate ) {
      continue;
    }
    currencies.push(state.cabinet.currencies[name]);
  }
  return currencies;
}

export function loadTransactionInfo(id, type) {
  return new Promise((resolve, reject) => {
    api.get(`wallet/${type}/${id}`).then((resp) => {
      resolve(resp);
    }).catch(() => reject());
  });
}

export function sendCoins(params) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Wallet.SendPut, params).then((resp) => {
      resolve(resp);
    }).catch((resp) => reject(resp));
  })
}