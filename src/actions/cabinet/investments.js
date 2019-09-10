import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';

export function loadInvestments() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Investment.DefaultGet).then(({ deposits, payments, chart, ...props }) => {
      payments = Object.values(payments);
      dispatch({ type: actionTypes.INVESTMENTS_SET, deposits, payments, chart });
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
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
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'profits', status: 'failed' });
    });
  };
}

export function loadWithdrawalHistory() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'withdrawals', status: 'loading' });
    //api.post();
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