import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import * as actionTypes from '../actionTypes';
import * as toast from '../toasts';
import { getLang } from '../../utils';
import { closeModal } from '../index';

export function getFiatWallets() {
  return (dispatch, getState) => {
    api.call(apiSchema.Fiat_wallet.DefaultGet).then(payload => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET, payload});
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'default', status: ''});
    })
  }
}

export function getMerchant(type) {
  return (dispatch, getState) => {
    const apiMethod = type === 'withdrawal' ? apiSchema.Fiat_wallet.WithdrawMethodsGet : apiSchema.Fiat_wallet.PayMethodsGet;

    dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'merchants', status: 'loading'});
    api.call(apiMethod).then(response => {
      let methods = type === 'withdrawal' ? response : response.methods; // TODO: HACK
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


export function getBankList() {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'bankList', status: 'loading'});
    api.call(apiSchema.Fiat_wallet.Xendit.BanksGet).then(banks => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_BANK_LIST, banks });
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'bankList', status: null });
    })
  }
}

export function fiatWithdrawal(params) {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'withdrawal', status: 'loading'});
    api.call(apiSchema.Fiat_wallet.WithdrawPut, {
      bank_code: params.bank.code,
      account_holder_name: params.accountHolderName,
      account_number: params.accountNumber,
      amount: params.amount,
      email_to: params.email,
      balance_id: params.balance.id,
    }).then(({transaction}) => {
      toast.success(getLang('cabinet_fiatWithdrawalModal_WithdrawalCreated'));
      closeModal();
      dispatch({type: actionTypes.FIAT_WALLETS_APPEND_TRANSACTION, transaction });
    }).finally(() => {
      dispatch({type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS, section: 'withdrawal', status: null });
    }).catch((err) => {
      toast.error(err.message);
    })
  }
}
