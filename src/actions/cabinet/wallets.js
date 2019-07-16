import * as actionTypes from '../actionTypes';
import { WalletsApi } from '../../swagger';
import callApi from '../../services/api';
import store from '../../store';

export function getWallets() {
  return new Promise((resolve, reject) => {
    callApi(new WalletsApi().walletsGetGet)
      .then((data) => {
        store.dispatch({ type: actionTypes.WALLETS, payload: data.wallets });
        store.dispatch({ type: actionTypes.TRANSACTION_HISTORY, payload: data.history });
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function getTransactionHistory(walletId) {
  return new Promise((resolve, reject) => {
    callApi(new WalletsApi().transactionsHistoryGet, walletId)
      .then((data) => {
        store.dispatch({ type: actionTypes.WALLET_HISTORY, payload: data });
        resolve();
      })
      .catch((err) => reject(err));
  });
}
