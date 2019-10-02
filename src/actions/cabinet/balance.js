import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import * as toast from './toasts';

export function getBalance(category) {
  return api.call(apiSchema.Balance.DefaultGet, { category });
}

export function deposit({ from, amount }) {
  return api.call(apiSchema.Balance.DepositPost, {
    wallet_id: from,
    amount
  }).then(() => {
    toast.success('Balance replenished');
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
    toast.success('Wallet replenished');
  }).catch((err) => {
    toast.error(err.message);
    throw err;
  });
}
