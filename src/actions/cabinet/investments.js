import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';

export function loadInvestments() {
  return dispatch => {
    dispatch({ type: actionTypes.INVESTMENTS_SET_LOADING_STATUS, section: 'default', status: 'loading' });
<<<<<<< HEAD
    api.call(schemaAPI["investment/"]).then(({ deposits, payments, chart, ...props }) => {
=======
    api.call(apiSchema.Investment.DefaultGet).then(({ deposits, payments, ...props }) => {
>>>>>>> f832c705cf2066de3eeff1f1e63904a47f6efa3a
      payments = Object.values(payments);
      //TODO: убрать fake data
      payments.push({currency: 'btc', invested_amount:1000, paid_amount:1, isEmpty: false},
        {currency: 'eth', invested_amount:0, paid_amount:0, isEmpty: true},
        {currency: 'ltc', invested_amount:1, paid_amount:1, isEmpty: false});
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
