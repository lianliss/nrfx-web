import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import store from "../../store";
import * as toastsActions from "./toasts";

export function loadInvestments() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Investment.DefaultGet).then(({ deposits, payments, chart, ...props }) => {
      payments = Object.values(payments);
      dispatch({ type: actionTypes.INVESTMENTS_SET, deposits, payments, chart });
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
      toastsActions.toastPush("Error load investment", "error")(dispatch);
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    });
  };
}

export function loadProfitHistory() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'profits', status: 'loading' });
    api.call(apiSchema.Investment.ProfitGet).then((profits) => {
      dispatch({ type: actionTypes.INVESTMENTS_PROFITS_SET, profits });
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'profits', status: '' });
    }).catch((err) => {
      console.log(err);
      toastsActions.toastPush("Error load profit history", "error")(dispatch);
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'profits', status: 'failed' });
    });
  };
}

export function loadWithdrawalHistory() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'withdrawals', status: 'loading' });
    api.call(apiSchema.Investment.WithdrawalGet).then((withdrawals) => {
      dispatch({ type: actionTypes.INVESTMENTS_WITHDRAWALS_SET, withdrawals });
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'withdrawals', status: '' });
    }).catch((err) => {
      console.log(err);
      toastsActions.toastPush("Error load withdrawal history", "error")(dispatch);
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'withdrawals', status: 'failed' });
    });
  };
}


export function loadMoreWithdrawalHistory() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_WITHDRAWALS_SET_LOADING_MORE_STATUS, payload: true });
    api.call(apiSchema.Investment.WithdrawalGet, {
      start_from: store.getState().investments.withdrawals.next,
      count: 20,
    }).then((data) => {
      const { items, next } = data;
      dispatch({ type: actionTypes.INVESTMENTS_WITHDRAWALS_SET_LOADING_MORE_STATUS, payload: false });
      dispatch({ type: actionTypes.INVESTMENTS_WITHDRAWALS_APPEND, items, next });
    }).catch(() => {
      toastsActions.toastPush("Error load more withdrawal history", "error")(dispatch);
      dispatch({ type: actionTypes.INVESTMENTS_WITHDRAWALS_SET_LOADING_MORE_STATUS, payload: false });
    });
  };
}

export function depositAdd({amount, wallet_id, plan_id, deposit_type}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Investment.DepositPut, {amount, wallet_id, plan_id, deposit_type}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function withdrawAdd({amount, wallet_id, ga_code}) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Investment.WithdrawPut, {amount, wallet_id, ga_code}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function getPlans(currency, amount, deposit_type) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Investment.PlansGet, {currency, amount, deposit_type}).then((data) => {
      resolve(data);
    }).catch((reason) => {
      reject(reason);
    });
  });
}