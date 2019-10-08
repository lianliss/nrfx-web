import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import * as toast from './toasts';
import * as utils from '../../utils';

export function getBalance(category) {
  return api.call(apiSchema.Balance.DefaultGet, { category });
}

export function deposit({ from, amount }) {
  return api.call(apiSchema.Balance.DepositPost, {
    wallet_id: from,
    amount
  }).then(() => {
    toast.success(utils.getLang('cabinet_manageBalance_withdraw_success'));
  }).catch((err) => {
    toast.error(err.message);
    throw err;
  });
}

export function withdraw({ from, amount }) {
  return api.call(apiSchema.Balance.WithdrawPost, {
    balance_id: from,
    amount
  }).then(() => {
    toast.success(utils.getLang('cabinet_manageBalance_withdraw_success'));
  }).catch((err) => {
    toast.error(err.message);
    throw err;
  });
}
