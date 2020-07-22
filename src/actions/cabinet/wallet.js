import * as actionTypes from "../actionTypes";
import * as api from "../../services/api";
import apiSchema from "../../services/apiSchema";

export function loadWalletPage() {
  return dispatch => {
    dispatch({
      type: actionTypes.WALLET_SET_STATUS,
      section: "main",
      status: "loading"
    });
    api
      .call(apiSchema.Fiat_wallet.DefaultGet)
      .then(payload => {
        dispatch({
          type: actionTypes.WALLET_INIT,
          payload
        });
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: "main",
          status: ""
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: "main",
          status: "failed"
        });
      });
  };
}

export function loadHistory(options) {
  return dispatch => {
    dispatch({
      type: actionTypes.WALLET_SET_STATUS,
      section: "history",
      status: "loading"
    });
    api
      .call(apiSchema.History.DefaultGet, options)
      .then(payload => {
        dispatch({
          type: actionTypes.WALLET_HISTORY_SET,
          payload
        });
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: "history",
          status: ""
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: "history",
          status: "failed"
        });
      });
  };
}
