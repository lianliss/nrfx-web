import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import * as actionTypes from '../actionTypes';
import * as toast from '../toasts';
import { getLang } from '../../utils';

export function getFiatWallets() {
  return (dispatch, getState) => {
    api.call(apiSchema.Fiat_wallet.DefaultGet).then(payload => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET, payload});
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'default', status: ''});
    })
  }
}

export function getMerchant() {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'merchants', status: 'loading'});
    api.call(apiSchema.Fiat_wallet.PayMethodsGet).then(({methods}) => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_MERCHANTS, methods });
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'merchants', status: ''});
    })
  }
}

export function exchange({from, to, amount, amountType}) {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'marketForm', status: 'loading'});
    api.call(apiSchema.Fiat_wallet.ExchangePost, {
      from_currency: from,
      to_currency: to,
      amount_type: amountType,
      amount: amount
    }).then(payload => {
      dispatch({type: actionTypes.FIAT_WALLETS_UPDATE, payload});
      toast.success(getLang('cabinet_fiatWalletExchangeSuccessText'));
    }).catch(err => {
      toast.error(err.message);
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'marketForm', status: ''});
    })
  }
}
export function payForm({merchant, amount, currency}) {
  return api.call(apiSchema.Fiat_wallet.PayFormGet, {
    merchant,
    amount,
    currency
  }).catch(err => {
    toast.error(err.message);
    throw err;
  })
}

export function getRate({base, currency}) {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'rate', status: 'loading'});
    api.call(apiSchema.Fiat_wallet.RateGet, {base, currency}).then(({rate}) => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_RATE, rate, uprateTime: new Date().getTime() });
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'rate', status: null });
    })
  }
}
