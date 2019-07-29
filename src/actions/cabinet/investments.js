import * as actionTypes from '../actionTypes';
import store from '../../store';
import * as api from '../../services/api';

export function loadInvestments() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.get('investment').then(({ deposits, payments }) => {
      payments = Object.values(payments);
      dispatch({ type: actionTypes.INVESTMENTS_SET, deposits, payments });
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
      dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    });
  };
}

export function loadProfitHistory() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'profits', status: 'loading' });
    //api.post();
  };
}

export function loadWithdrawalHistory() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'withdrawals', status: 'loading' });
    //api.post();
  };
}
