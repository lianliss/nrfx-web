import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';

export function loadInvestments() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.get('investment').then(({ deposits, payments, ...props }) => {
      payments = Object.values(payments);
      //TODO: убрать fake data
      payments.push({currency: 'btc', invested_amount:1000, paid_amount:1, isEmpty: false},
        {currency: 'eth', invested_amount:0, paid_amount:0, isEmpty: true},
        {currency: 'ltc', invested_amount:1, paid_amount:1, isEmpty: false});
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
    api.get('profit', { offset: 0 }).then((profits) => {
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
