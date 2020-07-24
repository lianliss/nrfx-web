import { put, takeLatest, call, select } from "redux-saga/effects";
import {
  walletHistoryAddMore,
  walletHistorySet,
  walletSetInitState,
  walletSetStatus
} from "../actions/cabinet/wallet";
import { call as api } from "src/services/api";
import apiSchema from "../services/apiSchema";
import * as toast from "../actions/toasts";
import * as actionTypes from "../actions/actionTypes";
import { PAGE_COUNT } from "../index/constants/cabinet";
import { walletHistoryNextSelector } from "../selectors";

function* getHistoryWorker(action) {
  yield put(walletSetStatus("history", "loading"));
  try {
    const payload = yield call(api, apiSchema.History.DefaultGet, {
      ...action.payload,
      count: PAGE_COUNT
    });
    yield put(walletHistorySet(payload));
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(walletSetStatus("history", ""));
  }
}

function* getHistoryMoreWorker(action) {
  const next = yield select(walletHistoryNextSelector);
  yield put(walletSetStatus("historyMore", "loading"));
  try {
    const payload = yield call(api, apiSchema.History.DefaultGet, {
      ...action.payload,
      count: PAGE_COUNT,
      start_from: next
    });
    yield put(walletHistoryAddMore(payload));
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(walletSetStatus("historyMore", ""));
  }
}

function* getWalletPageWorker() {
  yield put(walletSetStatus("main", "loading"));
  try {
    const payload = yield call(api, apiSchema.Fiat_wallet.DefaultGet, {
      count: PAGE_COUNT
    });
    yield put(walletSetInitState(payload));
    yield put(walletSetStatus("main", ""));
  } catch (e) {
    yield put(walletSetStatus("main", "failed"));
  }
}

export function* rootWalletSaga() {
  yield takeLatest(actionTypes.WALLET_FETCH_HISTORY, getHistoryWorker);
  yield takeLatest(actionTypes.WALLET_FETCH_HISTORY_MORE, getHistoryMoreWorker);
  yield takeLatest(actionTypes.WALLET_FETCH_PAGE, getWalletPageWorker);
}
