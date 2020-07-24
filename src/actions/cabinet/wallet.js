import * as actionTypes from "../actionTypes";

import * as api from "../../services/api";
import apiSchema from "../../services/apiSchema";
import { PAGE_COUNT } from "../../index/constants/cabinet";
import * as toastsActions from "../toasts";

export function fetchWalletPage() {
  return { type: actionTypes.WALLET_FETCH_PAGE };
}

export function walletSetInitState(payload) {
  return { type: actionTypes.WALLET_SET_INIT_STATE, payload };
}

export function walletSetStatus(section, status) {
  return {
    type: actionTypes.WALLET_SET_STATUS,
    section,
    status
  };
}

export function walletHistorySet(payload) {
  return {
    type: actionTypes.WALLET_HISTORY_SET,
    payload
  };
}

export function walletHistoryAddMore(payload) {
  return {
    type: actionTypes.WALLET_HISTORY_ADD_MORE,
    payload
  };
}

export function walletFetchHistory(payload) {
  return { type: actionTypes.WALLET_FETCH_HISTORY, payload };
}

export function walletFetchHistoryMore(payload) {
  return { type: actionTypes.WALLET_FETCH_HISTORY_MORE, payload };
}
