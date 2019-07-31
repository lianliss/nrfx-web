import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import store from '../../store';

export function loadWallets() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: actionTypes.WALLETS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
      api.get('wallet').then(({ balances, transactions }) => {
        dispatch({ type: actionTypes.WALLETS_SET_LOADING_STATUS, section: 'default', status: '' });
        dispatch({ type: actionTypes.WALLETS_SET, wallets: balances });
        dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_SET, items: transactions, next: false });
        resolve(balances);
      }).catch(() => {
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
  return dispatch => {
    dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: 'loading' });
    api.get('wallet/transaction', {
      start_from: store.getState().wallets.transactionsNext
    }).then(({ items, next }) => {
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: '' });
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_APPEND, items, next });
    }).catch(() => {
      dispatch({ type: actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE, status: 'failed' });
    });
  };
}

export function getNoGeneratedCurrencies() {
  const state = store.getState();

  let exist = {};
  for (let i = 0; i < state.wallets.wallets.length; i++) {
    exist[state.wallets.wallets[i].currency] = true;
  }

  let currencies = [];
  for (let name in state.cabinet.currencies) {
    if (exist[name]) {
      continue;
    }
    currencies.push(state.cabinet.currencies[name]);
  }

  return currencies;
}
