import * as actionTypes from '../actionTypes';
import { WalletsApi } from '../../swagger';
import callApi from '../../services/api';
import store from '../../store';

export function getWallets() {
  return new Promise((resolve, reject) => {
    callApi(new WalletsApi().walletsGet)
      .then((data) => {
        store.dispatch({ type: actionTypes.WALLETS, payload: data.wallets });
        resolve();
      })
      .catch((err) => reject(err));
  });
}

export function getTransactionHistory(walletId) {
  return new Promise((resolve, reject) => {
    callApi(new WalletsApi().transactionsHistoryGet, walletId)
      .then((data) => {
        console.log('data :', data);
        store.dispatch({ type: actionTypes.TRANSACTION_HISTORY, payload: data });
        resolve();
      })
      .catch((err) => reject(err));
  });
}
